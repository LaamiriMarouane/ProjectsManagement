package ProjectsManagmentBackEnd.services;

import ProjectsManagmentBackEnd.entity.ProjectRole;
import ProjectsManagmentBackEnd.entity.project.Project;
import ProjectsManagmentBackEnd.entity.project.ProjectGroup;
import ProjectsManagmentBackEnd.entity.user.Role;
import ProjectsManagmentBackEnd.entity.user.User;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import ProjectsManagmentBackEnd.repository.ProjectGroupRepository;
import ProjectsManagmentBackEnd.repository.ProjectRoleRepository;
import ProjectsManagmentBackEnd.repository.RoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProjectRoleServiceImp {

    private ProjectRoleRepository projectRoleRepository;
    private ProjectGroupRepository projectGroupRepository;
    private RoleRepository roleRepository;

    public ProjectRole addUserRoleForAProject(Project project, User user, Role role){
      String groupName=project.getAdmins().getGroupName();
     ProjectGroup projectGroup=projectGroupRepository.findByGroupName(groupName);
     ProjectRole projectRole=new ProjectRole();
     projectRole.setUser(user);
     projectRole.setRole(role);
     projectRole.setGroup(projectGroup);
        return projectRoleRepository.save(projectRole);
    }
    public Optional<Role> getUserRoleForAProject(Project project, User user) throws BusinessException {
        String groupName=project.getAdmins().getGroupName();
        ProjectGroup projectGroup=projectGroupRepository.findByGroupName(groupName);
      Optional<ProjectRole> projectRole=  projectRoleRepository.findByUserAndGroup(user,projectGroup);
      if(projectRole.isPresent()){
       return  Optional.of(projectRole.get().getRole());
      }else{
         return Optional.empty();
      }

    }

    public ProjectRole updateUserRoleForAProject(Project project, User user , Role newRole) throws BusinessException {
        String groupName=project.getAdmins().getGroupName();
        ProjectGroup projectGroup=projectGroupRepository.findByGroupName(groupName);
        Optional<ProjectRole> projectRole=  projectRoleRepository.findByUserAndGroup(user,projectGroup);
        if(projectRole.isPresent()){
            roleRepository.delete(projectRole.get().getRole());
            projectRole.get().setRole(newRole);
            return  projectRoleRepository.save(projectRole.get());
        }else{
            Map error=  new HashMap();
            error.put("error","role not found");
            throw  new BusinessException("error",1111, error);
        }
        
    }
}
