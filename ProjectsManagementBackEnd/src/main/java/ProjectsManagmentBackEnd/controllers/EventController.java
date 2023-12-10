package ProjectsManagmentBackEnd.controllers;


import ProjectsManagmentBackEnd.dtos.EventDTO;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import ProjectsManagmentBackEnd.holders.ApiPaths;
import ProjectsManagmentBackEnd.services.EventServiceImp;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiPaths.V1+ApiPaths.EVENTS)
@AllArgsConstructor
public class EventController {

    private EventServiceImp eventServiceImp;
    @GetMapping(ApiPaths.USERS)
    public List<EventDTO> getAll() throws BusinessException {
        return eventServiceImp.getAllByUser();

    }

    @PostMapping(ApiPaths.USERS)
    public EventDTO addEventToUserEvents(@RequestBody EventDTO eventDTO) throws BusinessException {
        return eventServiceImp.addEventToUserEvents(eventDTO);

    }


}
