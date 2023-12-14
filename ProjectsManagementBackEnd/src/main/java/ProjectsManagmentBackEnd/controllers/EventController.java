package ProjectsManagmentBackEnd.controllers;


import ProjectsManagmentBackEnd.dtos.EventDTO;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import ProjectsManagmentBackEnd.holders.ApiPaths;
import ProjectsManagmentBackEnd.services.EventServiceImp;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    @GetMapping(ApiPaths.PROJECTS+"/{projectId}")
    public List<EventDTO> getAll(@PathVariable("projectId") String id) throws BusinessException {
        return eventServiceImp.getAllByProject(id);

    }

    @PostMapping(ApiPaths.USERS)
    public EventDTO addEventToUserEvents(@RequestBody EventDTO eventDTO) throws BusinessException {
        return eventServiceImp.addEventToUserEvents(eventDTO);

    }
    @PostMapping(ApiPaths.PROJECTS+"/{projectId}")
    public EventDTO addEventToProjectEvents(@PathVariable("projectId") String id,@RequestBody EventDTO eventDTO) throws BusinessException {
        return eventServiceImp.addEventToProjectEvents(id,eventDTO);

    }


}
