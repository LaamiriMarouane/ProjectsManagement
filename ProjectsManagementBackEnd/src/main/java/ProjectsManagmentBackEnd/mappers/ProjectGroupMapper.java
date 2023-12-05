package ProjectsManagmentBackEnd.mappers;

import ProjectsManagmentBackEnd.dtos.ProjectGroupDTO;
import ProjectsManagmentBackEnd.entity.project.ProjectGroup;

import java.util.stream.Collectors;

public class ProjectGroupMapper {
    public static ProjectGroupDTO convert(ProjectGroup in) {

        if (in != null) {
            final ProjectGroupDTO out = new ProjectGroupDTO();
            out.setId(in.getId());
            out.setGroupName(in.getGroupName());



            return out;
        }
        return null;
    }
    public static ProjectGroup  convert(ProjectGroupDTO in) {

        if (in != null) {
            final ProjectGroup out = new ProjectGroup();
            out.setId(in.getId());
            out.setGroupName(in.getGroupName());
            out.setGroupType(in.getGroupType());

            return out;
        }
        return null;
    }
}
