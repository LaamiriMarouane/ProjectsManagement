package ProjectsManagmentBackEnd.services;

import ProjectsManagmentBackEnd.entity.ProjectRole;
import ProjectsManagmentBackEnd.entity.project.ProjectGroup;
import ProjectsManagmentBackEnd.entity.user.User;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import ProjectsManagmentBackEnd.repository.ProjectRoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProjectRoleServiceImp {

    private ProjectRoleRepository projectRoleRepository;
    public ProjectRole addUserRoleForAProject(ProjectRole projectRole){
        return projectRoleRepository.save(projectRole);
    }
    public ProjectRole getUserRoleForAProject(ProjectGroup projectGroup, User user) throws BusinessException {
      Optional<ProjectRole> projectRole=  projectRoleRepository.findByUserAndGroup(user,projectGroup);
      if(projectRole.isPresent()){
       return   projectRole.get();
      }else{
          Map error=  new HashMap();
          error.put("error","role not found");
          throw  new BusinessException("error",1111, error);
      }

    }

    public void UpdateUserRoleForAProject(ProjectRole projectRole){
        
    }
}
