package ProjectsManagmentBackEnd.services;

import ProjectsManagmentBackEnd.dtos.ProjectDTO;
import ProjectsManagmentBackEnd.entity.project.GroupType;
import ProjectsManagmentBackEnd.entity.project.Project;
import ProjectsManagmentBackEnd.entity.project.ProjectGroup;
import ProjectsManagmentBackEnd.entity.user.RoleType;
import ProjectsManagmentBackEnd.entity.user.User;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import ProjectsManagmentBackEnd.mappers.ProjectMapper;
import ProjectsManagmentBackEnd.repository.ProjectGroupRepository;
import ProjectsManagmentBackEnd.repository.ProjectRepository;
import ProjectsManagmentBackEnd.repository.UserRepository;
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
    ProjectGroupRepository projectGroupRepository;
    UserRepository userRepository;
    public ResponseEntity<List<ProjectDTO>> getAll() {
        List<ProjectDTO> projectDTOList;
        User user= UserContext.currentUser();
        if(user.getRole().getName()== RoleType.APP_ADMIN){
            projectDTOList=projectRepository.findAll().stream().map(ProjectMapper::convert).collect(Collectors.toList());
        }else if(user.getRole().getName()== RoleType.GUEST){
            projectDTOList=projectRepository.findAllByIsPublicIsAndIsActiveIs(true,true).stream().map(ProjectMapper::convert).collect(Collectors.toList());

        }
        else{
            List<ProjectGroup>userGroups=projectGroupRepository.findAllByUsersContaining(user);
          //  projectDTOList=projectRepository.findAllByMembersGroupInOrAdminsGroupIn(userGroups,userGroups).stream().map(ProjectMapper::convert).collect(Collectors.toList());
            projectDTOList=projectRepository.findAllByProjectGroupsContaining(userGroups).stream().map(ProjectMapper::convert).collect(Collectors.toList());
        }
        return ResponseEntity.status(HttpStatus.OK).body(projectDTOList);

    }
    public void create(Project project, User user){
        //to do add admin role to the user in creating the demand
        ProjectGroup adminsGroup =new ProjectGroup();
        adminsGroup.setGroupName(project.getShortName()+"_adm");
        adminsGroup.setGroupType(GroupType.ADMIN_GROUP);
        Set<User> userSet=new HashSet<>();
        userSet.add(user);
        adminsGroup.setUsers(userSet);
        adminsGroup.setProject(project);
        ProjectGroup membersGroup =new ProjectGroup();
        membersGroup.setGroupName(project.getShortName());
        membersGroup.setProject(project);
        membersGroup.setGroupType(GroupType.MEMBER_GROUP);
        List<ProjectGroup> projectGroups=new ArrayList<>();
        projectGroups.add(adminsGroup);
        projectGroups.add(membersGroup);
        project.setProjectGroups(projectGroups);
        //project.setActive(true);
        projectRepository.save(project);

    }
    public ResponseEntity addMember(String projectId, String userId) throws BusinessException {
      Optional<Project> project=projectRepository.findById(projectId);
      if(project.isPresent()){
          User member=userRepository.findById(userId).get();
          //to do add role project_member to the user added ;
          if(project.get().getProjectGroups().get(0).getGroupType()==GroupType.MEMBER_GROUP){
              project.get().getProjectGroups().get(0).getUsers().add(member);
          }else{
              project.get().getProjectGroups().get(1).getUsers().add(member);
          }
          return ResponseEntity.status(HttpStatus.OK).build();

      }else{
          throw  new BusinessException("project not found");
      }

    }
    public ResponseEntity addAdmin(String projectId, String userId) throws BusinessException {
        Optional<Project> project=projectRepository.findById(projectId);
        if(project.isPresent()){
            User admin=userRepository.findById(userId).get();
            //to do add role project_admin to the user added ;
            if(project.get().getProjectGroups().get(0).getGroupType()==GroupType.ADMIN_GROUP){
                project.get().getProjectGroups().get(0).getUsers().add(admin);
            }else{
                project.get().getProjectGroups().get(1).getUsers().add(admin);
            }
            return ResponseEntity.status(HttpStatus.OK).build();

        }else{
            throw  new BusinessException("project not found");
        }
    }


}
