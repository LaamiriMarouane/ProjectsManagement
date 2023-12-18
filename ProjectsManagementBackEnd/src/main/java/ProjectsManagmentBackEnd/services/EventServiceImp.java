package ProjectsManagmentBackEnd.services;

import ProjectsManagmentBackEnd.dtos.EventDTO;
import ProjectsManagmentBackEnd.dtos.project.ProjectDTO;
import ProjectsManagmentBackEnd.entity.event.ProjectEvent;
import ProjectsManagmentBackEnd.entity.event.UserEvent;
import ProjectsManagmentBackEnd.entity.project.Project;
import ProjectsManagmentBackEnd.entity.user.Role;
import ProjectsManagmentBackEnd.entity.user.User;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import ProjectsManagmentBackEnd.mappers.EventMapper;
import ProjectsManagmentBackEnd.mappers.ProjectMapper;
import ProjectsManagmentBackEnd.repository.ProjectEventRepository;
import ProjectsManagmentBackEnd.repository.ProjectRepository;
import ProjectsManagmentBackEnd.repository.RoleRepository;
import ProjectsManagmentBackEnd.repository.UserEventRepository;
import ProjectsManagmentBackEnd.security.JwtAuthenticationResponse;
import ProjectsManagmentBackEnd.services.validation.EventValidator;
import ProjectsManagmentBackEnd.utils.UserContext;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EventServiceImp {
    private UserEventRepository userEventRepository;
    private ProjectEventRepository projectEventRepository;
    private EventValidator eventValidate;
    private ProjectRepository projectRepository;
    private ProjectRoleServiceImp projectRoleServiceImp;
    private UserServiceImp userServiceImp;
    private RoleRepository roleRepository;
    public List<EventDTO> getAllByUser()  {
        User user= UserContext.currentUser();
        List<EventDTO> events=  userEventRepository.findAllByUser(user).stream().map(EventMapper::convert).collect(Collectors.toList());
        return events ;

    }
    public ResponseEntity getAllByProject(String projectId) throws BusinessException {
        Optional<Project> project=projectRepository.findById(projectId);
        if(project.isPresent()){
            User user= UserContext.currentUser();
            Optional<Role> role=projectRoleServiceImp.getUserRoleForAProject(project.get(),user);
            ProjectDTO projectDTO= ProjectMapper.convert(project.get());
            if(role.isPresent()){
                Role roleToSet;
                roleToSet=role.get();
                JwtAuthenticationResponse newJwtAuthenticationResponse= userServiceImp.updateAuthoritiesForUser(roleToSet);
                projectDTO.setJwtAuthenticationResponse(newJwtAuthenticationResponse);
            }else{
                return   ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

        List<EventDTO> events=  projectEventRepository.findAllByProject(project.get()).stream().map(EventMapper::convert).collect(Collectors.toList());
            projectDTO.setEvents(events);
        return ResponseEntity.status(HttpStatus.OK).body(projectDTO)  ;
        }else{

            Map error=  new HashMap();
            error.put("error","project not found ");
            throw  new BusinessException("error",1111, error);
        }
    }


    public EventDTO addEventToUserEvents(EventDTO eventDTO) throws BusinessException {
        eventValidate.eventValidate(eventDTO);
        UserEvent event = EventMapper.convert(eventDTO);
        User user= UserContext.currentUser();
        event.setUser(user);
        userEventRepository.save(event);
        return EventMapper.convert(event);

    }
    public EventDTO addEventToProjectEvents(String projectId,EventDTO eventDTO) throws BusinessException {
        eventValidate.eventValidate(eventDTO);
        ProjectEvent event =EventMapper.convertToProjectEvent(eventDTO);
        Optional<Project> project=projectRepository.findById(projectId);
        if(project.isPresent()){

            event.setProject(project.get());
            projectEventRepository.save(event);
            return EventMapper.convert(event);
        }else{
            Map error=  new HashMap();
            error.put("error","project not found ");
            throw  new BusinessException("error",1111, error);
        }


    }
    public Map deleteEventFromProjectEvents(String eventId) throws BusinessException {

        Optional<ProjectEvent> event=projectEventRepository.findById(eventId);
        if(event.isPresent()){

            projectEventRepository.delete(event.get());
            Map response=  new HashMap();
            response.put("eventId",eventId);
            return response ;
        }else{
            Map error=  new HashMap();
            error.put("error","event not found ");
            throw  new BusinessException("error",1111, error);
        }


    }
    public Map deleteEventFromUserEvents(String eventId) throws BusinessException {
        Optional<UserEvent> event=userEventRepository.findById(eventId);
        if(event.isPresent()){
            userEventRepository.delete(event.get());
            Map response=  new HashMap();
            response.put("eventId",eventId);
            return response ;
        }else{
            Map error=  new HashMap();
            error.put("error","event not found ");
            throw  new BusinessException("error",1111, error);
        }

    }
}
