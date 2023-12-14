package ProjectsManagmentBackEnd.mappers;

import ProjectsManagmentBackEnd.dtos.ProjectGroupDTO;
import ProjectsManagmentBackEnd.entity.project.AdminsProjectGroup;
import ProjectsManagmentBackEnd.entity.project.MembersProjectGroup;
import ProjectsManagmentBackEnd.entity.project.ProjectGroup;

import java.util.stream.Collectors;

public class ProjectGroupMapper {
    public static ProjectGroupDTO convert(ProjectGroup in) {

        if (in != null) {
            final ProjectGroupDTO out = new ProjectGroupDTO();
            out.setId(in.getId());
            out.setGroupName(in.getGroupName());
            out.setUsers(in.getUsers().stream().map(UserMapper::convertShort).collect(Collectors.toSet()));



            return out;
        }
        return null;
    }
    public static MembersProjectGroup convertToMembersGroup(ProjectGroupDTO in) {

        if (in != null) {
            final MembersProjectGroup out = new MembersProjectGroup();
            out.setId(in.getId());
            out.setGroupName(in.getGroupName());

            return out;
        }
        return null;
    }
    public static AdminsProjectGroup  convertToAdminGroup(ProjectGroupDTO in) {

        if (in != null) {
            final AdminsProjectGroup out = new AdminsProjectGroup();
            out.setId(in.getId());
            out.setGroupName(in.getGroupName());

            return out;
        }
        return null;
    }
}
