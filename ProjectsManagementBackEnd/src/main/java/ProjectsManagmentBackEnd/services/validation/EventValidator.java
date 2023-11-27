package ProjectsManagmentBackEnd.services.validation;

import ProjectsManagmentBackEnd.dtos.EventDTO;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@AllArgsConstructor
public class EventValidator {
    private ObjectValidator<EventDTO> eventDTOObjectValidator;
    public  void eventValidate(EventDTO eventDTO) throws BusinessException {
        Map isEventDTOValid=eventDTOObjectValidator.validate(eventDTO);
        if (!isEventDTOValid.isEmpty()){
            throw new BusinessException("event is not valid",isEventDTOValid);
        }

    }
}
