package ProjectsManagmentBackEnd.services;

import ProjectsManagmentBackEnd.dtos.EventDTO;
import ProjectsManagmentBackEnd.dtos.project.ProjectDTO;
import ProjectsManagmentBackEnd.dtos.project.ProjectShortDTO;
import ProjectsManagmentBackEnd.entity.project.AdminsProjectGroup;
import ProjectsManagmentBackEnd.entity.project.MembersProjectGroup;
import ProjectsManagmentBackEnd.entity.project.Project;
import ProjectsManagmentBackEnd.entity.project.ProjectGroup;
import ProjectsManagmentBackEnd.entity.user.RoleType;
import ProjectsManagmentBackEnd.entity.user.User;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import ProjectsManagmentBackEnd.mappers.ProjectMapper;
import ProjectsManagmentBackEnd.repository.*;
import ProjectsManagmentBackEnd.utils.UserContext;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProjectServiceImp {
    ProjectRepository projectRepository;
    AdminsProjectGroupRepository adminsProjectGroupRepository;
    MembersProjectGroupRepository membersProjectGroupRepository;
    ProjectGroupRepository projectGroupRepository;
    UserRepository userRepository;
    public ResponseEntity<List<ProjectShortDTO>> getAll() {
        List<ProjectShortDTO> projectDTOList;
        User user= UserContext.currentUser();
        if(user.getRole().getName()== RoleType.APP_ADMIN){
            projectDTOList=projectRepository.findAll().stream().map(ProjectMapper::convertShort).collect(Collectors.toList());
        }else{
            projectDTOList=projectRepository.findAllByIsPublicIsAndIsActiveIs(true,true).stream().map(ProjectMapper::convertShort).collect(Collectors.toList());
        }

        return ResponseEntity.status(HttpStatus.OK).body(projectDTOList);

    }
    public ResponseEntity<List<ProjectDTO>> getAllByUser() {
        List<ProjectDTO> projectDTOList;
        User user= UserContext.currentUser();
        List<MembersProjectGroup>userMemberRoleGroups=membersProjectGroupRepository.findAllByUsersContaining(user);
        List<AdminsProjectGroup>userAdminRoleGroups=adminsProjectGroupRepository.findAllByUsersContaining(user);
        projectDTOList=projectRepository.findProjectsByAdminOrMember(userAdminRoleGroups,userMemberRoleGroups).stream().map(ProjectMapper::convert).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(projectDTOList);

    }
    public ResponseEntity<ProjectDTO> getDetails(String id) throws BusinessException {
        Optional<Project> project =projectRepository.findById(id) ;
        if(project.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(ProjectMapper.convert(project.get()));

        }else{
           Map error=  new HashMap();
           error.put("error","project not found");
            throw  new BusinessException("error",1111, error);
        }
    }
    public void create(Project project, User user){
        //to do add admin role to the user in creating the demand
        AdminsProjectGroup adminsGroup =new AdminsProjectGroup();
        adminsGroup.setGroupName(project.getShortName()+"_adm");
        Set<User> userSet=new HashSet<>();
        userSet.add(user);
        adminsGroup.setUsers(userSet);
        adminsGroup.setProject(project);
        project.setAdmins(adminsGroup);
//        adminsProjectGroupRepository.save(adminsGroup);
        MembersProjectGroup membersGroup =new MembersProjectGroup();
        membersGroup.setGroupName(project.getShortName());
        membersGroup.setProject(project);
        project.setMembers(membersGroup);
  //      membersProjectGroupRepository.save(membersGroup);

        project.setActive(true);

        projectRepository.save(project);

    }
    public ResponseEntity addMember(String projectId, String userId) throws BusinessException {
      Optional<Project> project=projectRepository.findById(projectId);
      if(project.isPresent()){
          User member=userRepository.findById(userId).get();
          //to do add role project_member to the user added ;
         project.get().getMembers().getUsers().add(member);
          projectRepository.save(project.get());
          return ResponseEntity.status(HttpStatus.OK).build();

      }else{
          Map error=  new HashMap();
          error.put("error","project not found");
          throw  new BusinessException("error",1111, error);
      }

    }
    public ResponseEntity addAdmin(String projectId, String userId) throws BusinessException {
        Optional<Project> project=projectRepository.findById(projectId);
        if(project.isPresent()){
            User FutureAdmin=userRepository.findById(userId).get();
            //to do add role project_admin to the user added ;

           if(project.get().getMembers().getUsers().contains(FutureAdmin)){
               project.get().getMembers().getUsers().remove(FutureAdmin);
               project.get().getAdmins().getUsers().add(FutureAdmin);
           }else {
               Map error=  new HashMap();
               error.put("error","member not found");
               throw  new BusinessException("error",1111, error);

           }

            return ResponseEntity.status(HttpStatus.OK).build();

        }else{
            Map error=  new HashMap();
            error.put("error","project not found");
            throw  new BusinessException("error",1111, error);
        }
    }



}
