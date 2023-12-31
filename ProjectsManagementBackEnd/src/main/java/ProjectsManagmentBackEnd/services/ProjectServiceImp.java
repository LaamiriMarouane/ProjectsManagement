package ProjectsManagmentBackEnd.services;

import ProjectsManagmentBackEnd.dtos.project.ProjectDTO;
import ProjectsManagmentBackEnd.dtos.project.ProjectShortDTO;
import ProjectsManagmentBackEnd.entity.project.AdminsProjectGroup;
import ProjectsManagmentBackEnd.entity.project.MembersProjectGroup;
import ProjectsManagmentBackEnd.entity.project.Project;
import ProjectsManagmentBackEnd.entity.ressources.Folder;
import ProjectsManagmentBackEnd.entity.user.Role;
import ProjectsManagmentBackEnd.entity.user.RoleType;
import ProjectsManagmentBackEnd.entity.user.User;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import ProjectsManagmentBackEnd.holders.ApiPaths;
import ProjectsManagmentBackEnd.mappers.ProjectGroupMapper;
import ProjectsManagmentBackEnd.mappers.ProjectMapper;
import ProjectsManagmentBackEnd.repository.*;
import ProjectsManagmentBackEnd.security.JwtAuthenticationResponse;
import ProjectsManagmentBackEnd.utils.FileSystem;
import ProjectsManagmentBackEnd.utils.UserContext;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProjectServiceImp {
    private ProjectRepository projectRepository;
    private AdminsProjectGroupRepository adminsProjectGroupRepository;
    private MembersProjectGroupRepository membersProjectGroupRepository;
    private RoleRepository roleRepository;
    private RoleServiceImp roleServiceImp;
    private ProjectRoleServiceImp projectRoleServiceImp;
    private UserServiceImp userServiceImp;
    private UserRepository userRepository;
    private ProjectResourceServiceImp projectResourceServiceImp;

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
        Optional<Project> project =projectRepository.findById(id);
        if(project.isPresent()){
            User user= UserContext.currentUser();

            Optional<Role> role=projectRoleServiceImp.getUserRoleForAProject(project.get(),user);
            ProjectDTO projectDTO=ProjectMapper.convert(project.get());
            JwtAuthenticationResponse newJwtAuthenticationResponse;
            Role roleToSet;

            if(role.isPresent()){
                roleToSet=role.get();
                 newJwtAuthenticationResponse= userServiceImp.updateAuthoritiesForUser(roleToSet);
                MembersProjectGroup projectMembersGroup = membersProjectGroupRepository.findByProject(project.get());
                AdminsProjectGroup projectAdminGroup = adminsProjectGroupRepository.findByProject(project.get());
                projectDTO.setAdmins(ProjectGroupMapper.convert(projectAdminGroup));
                projectDTO.setMembers(ProjectGroupMapper.convert(projectMembersGroup));
                projectDTO.setJwtAuthenticationResponse(newJwtAuthenticationResponse);
            }else{
                roleToSet= userRepository.findById(user.getId()).get().getRole();
                newJwtAuthenticationResponse= userServiceImp.updateAuthoritiesForUser(roleToSet);
                projectDTO.setJwtAuthenticationResponse(newJwtAuthenticationResponse);
            }


            return ResponseEntity.status(HttpStatus.OK).body(projectDTO);

        }else{
           Map error=  new HashMap();
           error.put("error","project not found");
            throw  new BusinessException("error",1111, error);
        }
    }
    public void create(Project project, User user) throws IOException {
        AdminsProjectGroup adminsGroup =new AdminsProjectGroup();
        adminsGroup.setGroupName(project.getShortName()+"_adm");
        Set<User> userSet=new HashSet<>();
        userSet.add(user);
        adminsGroup.setUsers(userSet);
        adminsGroup.setProject(project);
        project.setAdmins(adminsGroup);
        MembersProjectGroup membersGroup =new MembersProjectGroup();
        membersGroup.setGroupName(project.getShortName());
        membersGroup.setProject(project);
        project.setMembers(membersGroup);
        project.setActive(true);
       Project savedProject= projectRepository.save(project);

        /* --------- Create Folder Root to init the resources -------- */
        projectResourceServiceImp.createRootFolderByProjectName( savedProject );
        /* --------- Create Folder Root to init the resources END -------- */

        //adding owner role to the user in creating the demand
      Role adminRole=  roleRepository.save(roleServiceImp.projectOwnerRole());
        projectRoleServiceImp.addUserRoleForAProject(savedProject,user,adminRole);
    }
    public ResponseEntity addMember(String projectId, String userId) throws BusinessException {
      Optional<Project> project=projectRepository.findById(projectId);
      if(project.isPresent()){
          User member=userRepository.findById(userId).get();
          //to do add role project_member to the user added ;
         if(!project.get().getMembers().getUsers().contains(member)){
             project.get().getMembers().getUsers().add(member);
             Project savedProject= projectRepository.save(project.get());
             Role memberRole=  roleRepository.save(roleServiceImp.projectMemberRole());
             projectRoleServiceImp.addUserRoleForAProject(savedProject,member,memberRole);

         }


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
               Project savedProject= projectRepository.save(project.get());
               Role adminRole=  roleRepository.save(roleServiceImp.projectAdminRole());
               projectRoleServiceImp.updateUserRoleForAProject(savedProject,FutureAdmin,adminRole);
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
