package ProjectsManagmentBackEnd.services;

import ProjectsManagmentBackEnd.dtos.DemandDTO;
import ProjectsManagmentBackEnd.dtos.ProjectDTO;
import ProjectsManagmentBackEnd.entity.ProjectGroup;
import ProjectsManagmentBackEnd.entity.user.RoleType;
import ProjectsManagmentBackEnd.entity.user.User;
import ProjectsManagmentBackEnd.mappers.DemandMapper;
import ProjectsManagmentBackEnd.mappers.ProjectMapper;
import ProjectsManagmentBackEnd.repository.DemandRepository;
import ProjectsManagmentBackEnd.repository.ProjectGroupRepository;
import ProjectsManagmentBackEnd.repository.ProjectRepository;
import ProjectsManagmentBackEnd.utils.UserContext;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProjectServiceImp {
    ProjectRepository projectRepository;
    ProjectGroupRepository projectGroupRepository;
    public ResponseEntity<List<ProjectDTO>> getAll() {
        List<ProjectDTO> projectDTOList;
        User user= UserContext.currentUser();
        if(user.getRole().getName()== RoleType.APP_ADMIN){
            projectDTOList=projectRepository.findAll().stream().map(ProjectMapper::convert).collect(Collectors.toList());
        }
        else{

            List<ProjectGroup>userGroups=projectGroupRepository.findAllByUsersContaining(user);
            projectDTOList=projectRepository.findAllByMembersGroupInOrAdminsGroupIn(userGroups,userGroups).stream().map(ProjectMapper::convert).collect(Collectors.toList());
        }
        return ResponseEntity.status(HttpStatus.OK).body(projectDTOList);

    }
}
