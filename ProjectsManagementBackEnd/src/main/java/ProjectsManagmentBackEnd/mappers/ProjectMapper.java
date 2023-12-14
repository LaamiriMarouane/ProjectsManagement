package ProjectsManagmentBackEnd.mappers;

import ProjectsManagmentBackEnd.dtos.project.ProjectDTO;
import ProjectsManagmentBackEnd.dtos.project.ProjectShortDTO;
import ProjectsManagmentBackEnd.entity.project.Project;

import java.util.stream.Collectors;

public class ProjectMapper {
    public static ProjectDTO convert(Project in) {

        if (in != null) {
            final ProjectDTO out = new ProjectDTO();
            out.setId(in.getId());
            out.setPublic(in.isPublic());
            out.setActive(in.isActive());
            out.setDescription(in.getDescription());
            out.setTheme(in.getTheme());
            out.setType(in.getType());
            out.setLongName(in.getLongName());
            out.setShortName(in.getShortName());
            out.setLastUpdate(in.getLastUpdate());
           out.setMembers(ProjectGroupMapper.convert(in.getMembers()));
           out.setAdmins(ProjectGroupMapper.convert(in.getAdmins()));
            out.setEvents(in.getEvents());



            return out;
        }
        return null;
    }
    public static Project  convert(ProjectDTO in) {

        if (in != null) {
            final Project out = new Project();
            out.setId(in.getId());
            out.setPublic(in.isPublic());
            out.setActive(in.isActive());
            out.setDescription(in.getDescription());
            out.setTheme(in.getTheme());
            out.setType(in.getType());
            out.setLongName(in.getLongName());
            out.setShortName(in.getShortName());
            out.setLastUpdate(in.getLastUpdate());
            out.setMembers(ProjectGroupMapper.convertToMembersGroup(in.getMembers()));
            out.setAdmins(ProjectGroupMapper.convertToAdminGroup(in.getAdmins()));
            out.setEvents(in.getEvents());
            return out;
        }
        return null;
    }
    public static ProjectShortDTO convertShort(Project in) {

        if (in != null) {
            final ProjectShortDTO out = new ProjectShortDTO();
            out.setId(in.getId());
            out.setLongName(in.getLongName());
            out.setShortName(in.getShortName());
            out.setDescription(in.getDescription());
            out.setTheme(in.getTheme());
            out.setType(in.getType());
            out.setLastUpdate(in.getLastUpdate());
            return out;
        }
        return null;
    }
}
