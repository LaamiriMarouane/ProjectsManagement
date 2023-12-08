package ProjectsManagmentBackEnd.services.validation;

import ProjectsManagmentBackEnd.dtos.project.ProjectDTO;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@AllArgsConstructor
public class ProjectValidator {
    private ObjectValidator<ProjectDTO> projectDTOObjectValidator;
    public  void projectGroupValidate(ProjectDTO projectDTO) throws BusinessException {
        Map isProjectDTOObjectValid=projectDTOObjectValidator.validate(projectDTO);
        if (!isProjectDTOObjectValid.isEmpty()){
            throw new BusinessException("Project is not valid",isProjectDTOObjectValid);
        }

    }
}
