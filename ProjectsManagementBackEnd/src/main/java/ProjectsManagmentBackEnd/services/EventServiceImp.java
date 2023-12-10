package ProjectsManagmentBackEnd.services;

import ProjectsManagmentBackEnd.dtos.EventDTO;
import ProjectsManagmentBackEnd.entity.event.Event;
import ProjectsManagmentBackEnd.entity.event.UserEvent;
import ProjectsManagmentBackEnd.entity.user.User;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import ProjectsManagmentBackEnd.mappers.EventMapper;
import ProjectsManagmentBackEnd.repository.ProjectEventRepository;
import ProjectsManagmentBackEnd.repository.UserEventRepository;
import ProjectsManagmentBackEnd.repository.UserRepository;
import ProjectsManagmentBackEnd.services.validation.EventValidator;
import ProjectsManagmentBackEnd.utils.UserContext;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EventServiceImp {
    private UserEventRepository userEventRepository;
    private ProjectEventRepository projectEventRepository;
    private EventValidator eventValidate;
    private UserRepository userRepository;
    public List<EventDTO> getAllByUser() throws BusinessException {
        User user= UserContext.currentUser();
        List<EventDTO> events=  userEventRepository.findAllByUser(user).stream().map(EventMapper::convert).collect(Collectors.toList());
        return events ;

    }


    public EventDTO addEventToUserEvents(EventDTO eventDTO) throws BusinessException {
        eventValidate.eventValidate(eventDTO);
        UserEvent event =(UserEvent) EventMapper.convert(eventDTO);
        User user= UserContext.currentUser();
        event.setUser(user);
        userEventRepository.save(event);
        return EventMapper.convert(event);

    }
}
