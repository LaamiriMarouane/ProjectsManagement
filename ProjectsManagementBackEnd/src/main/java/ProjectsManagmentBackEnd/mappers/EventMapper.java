package ProjectsManagmentBackEnd.mappers;

import ProjectsManagmentBackEnd.dtos.EventDTO;
import ProjectsManagmentBackEnd.entity.event.Event;
import ProjectsManagmentBackEnd.entity.event.ProjectEvent;
import ProjectsManagmentBackEnd.entity.event.UserEvent;

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
    public static UserEvent convert(EventDTO in) {

        if (in != null) {
            final UserEvent out = new UserEvent();
            out.setId(in.getId());
            out.setStartDate(in.getStart());
            out.setEndDate(in.getEnd());
            out.setTitle(in.getTitle());
            out.setColor(in.getColor());


            return out;
        }
        return null;
    }
    public static ProjectEvent convertToProjectEvent(EventDTO in) {

        if (in != null) {
            final ProjectEvent out = new ProjectEvent();
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
