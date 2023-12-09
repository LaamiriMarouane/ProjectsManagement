package ProjectsManagmentBackEnd.mappers;

import ProjectsManagmentBackEnd.dtos.EventDTO;
import ProjectsManagmentBackEnd.entity.event.Event;

public class EventMapper {
    public static EventDTO convert(Event in) {

        if (in != null) {
            final EventDTO out = new EventDTO();
            out.setId(in.getId());
            out.setStart(in.getStartDate());
            out.setEnd(in.getEndDate());
            out.setTitle(in.getTitle());
            out.setColor(in.getColor());


            return out;
        }
        return null;
    }
    public static Event  convert(EventDTO in) {

        if (in != null) {
            final Event out = new Event();
            out.setId(in.getId());
            out.setStartDate(in.getStart());
            out.setEndDate(in.getEnd());
            out.setTitle(in.getTitle());
            out.setColor(in.getColor());


            return out;
        }
        return null;
    }
}
