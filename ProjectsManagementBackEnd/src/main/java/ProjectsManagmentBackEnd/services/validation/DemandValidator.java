package ProjectsManagmentBackEnd.services.validation;

import ProjectsManagmentBackEnd.dtos.DemandDTO;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;
@Component
@AllArgsConstructor
public class DemandValidator {
    private ObjectValidator<DemandDTO> demandDTOObjectValidator;
    public  void demandValidate(DemandDTO demandDTO) throws BusinessException {
        Map isDemandDTOValid=demandDTOObjectValidator.validate(demandDTO);
        if (!isDemandDTOValid.isEmpty()){
            throw new BusinessException("event is not valid",isDemandDTOValid);
        }

    }
}
