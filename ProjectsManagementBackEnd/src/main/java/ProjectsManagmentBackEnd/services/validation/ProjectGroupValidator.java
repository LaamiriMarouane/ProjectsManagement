package ProjectsManagmentBackEnd.services.validation;

import ProjectsManagmentBackEnd.dtos.ProjectGroupDTO;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@AllArgsConstructor
public class ProjectGroupValidator {
    private ObjectValidator<ProjectGroupDTO> projectGroupDTOObjectValidator;
    public  void projectGroupValidate(ProjectGroupDTO projectGroupDTO) throws BusinessException {
        Map isProjectGroupDTOObjectValid=projectGroupDTOObjectValidator.validate(projectGroupDTO);
        if (!isProjectGroupDTOObjectValid.isEmpty()){
            throw new BusinessException("Group is not valid",isProjectGroupDTOObjectValid);
        }
    }
}
