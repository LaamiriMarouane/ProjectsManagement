package ProjectsManagmentBackEnd.services;

import ProjectsManagmentBackEnd.dtos.EventDTO;
import ProjectsManagmentBackEnd.entity.event.Event;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import ProjectsManagmentBackEnd.mappers.EventMapper;
import ProjectsManagmentBackEnd.repository.UserRepository;
import ProjectsManagmentBackEnd.services.validation.EventValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EventServiceImp {
    /*private EventRepository eventRepository;
    private EventValidator eventValidate;
    private UserRepository userRepository;
    public List<EventDTO> getAllByProject() throws BusinessException {
        List<EventDTO> events=  eventRepository.findAll().stream().map(EventMapper::convert).collect(Collectors.toList());
        return events ;

    }
    public List<EventDTO> getAllByUser() throws BusinessException {

        List<EventDTO> events=  eventRepository.findAll().stream().map(EventMapper::convert).collect(Collectors.toList());
        return events ;

    }
    public List<EventDTO> getByToDayDate( ) throws BusinessException {
        Date currentDate =new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String formattedDate = dateFormat.format(currentDate);

        List<EventDTO> events=  eventRepository.findAllByStartDate(formattedDate).stream().map(EventMapper::convert).collect(Collectors.toList());
        return events ;


    }

    public EventDTO add(EventDTO eventDTO) throws BusinessException {
        eventValidate.eventValidate(eventDTO);
        Event event = EventMapper.convert(eventDTO);

        eventRepository.save(event);
        return EventMapper.convert(event);

    }*/
}
