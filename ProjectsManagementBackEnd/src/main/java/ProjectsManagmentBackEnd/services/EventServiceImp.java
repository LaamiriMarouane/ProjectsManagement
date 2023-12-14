package ProjectsManagmentBackEnd.services;

import ProjectsManagmentBackEnd.dtos.EventDTO;
import ProjectsManagmentBackEnd.entity.event.Event;
import ProjectsManagmentBackEnd.entity.event.ProjectEvent;
import ProjectsManagmentBackEnd.entity.event.UserEvent;
import ProjectsManagmentBackEnd.entity.project.Project;
import ProjectsManagmentBackEnd.entity.user.User;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import ProjectsManagmentBackEnd.mappers.EventMapper;
import ProjectsManagmentBackEnd.repository.ProjectEventRepository;
import ProjectsManagmentBackEnd.repository.ProjectRepository;
import ProjectsManagmentBackEnd.repository.UserEventRepository;
import ProjectsManagmentBackEnd.repository.UserRepository;
import ProjectsManagmentBackEnd.services.validation.EventValidator;
import ProjectsManagmentBackEnd.utils.UserContext;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EventServiceImp {
    private UserEventRepository userEventRepository;
    private ProjectEventRepository projectEventRepository;
    private EventValidator eventValidate;
    private ProjectRepository projectRepository;
    public List<EventDTO> getAllByUser()  {
        User user= UserContext.currentUser();
        List<EventDTO> events=  userEventRepository.findAllByUser(user).stream().map(EventMapper::convert).collect(Collectors.toList());
        return events ;

    }
    public List<EventDTO> getAllByProject(String projectId) throws BusinessException {
        Optional<Project> project=projectRepository.findById(projectId);
        if(project.isPresent()){
        List<EventDTO> events=  projectEventRepository.findAllByProject(project.get()).stream().map(EventMapper::convert).collect(Collectors.toList());
        return events ;
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
}
