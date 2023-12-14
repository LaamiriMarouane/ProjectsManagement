package ProjectsManagmentBackEnd.services;

import ProjectsManagmentBackEnd.dtos.ProjectGroupDTO;
import ProjectsManagmentBackEnd.entity.project.ProjectGroup;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import ProjectsManagmentBackEnd.mappers.ProjectGroupMapper;
import ProjectsManagmentBackEnd.repository.ProjectGroupRepository;
import ProjectsManagmentBackEnd.services.validation.ProjectGroupValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ProjectGroupServiceImp {
    ProjectGroupRepository projectGroupRepository;
    ProjectGroupValidator projectGroupValidator;


}
