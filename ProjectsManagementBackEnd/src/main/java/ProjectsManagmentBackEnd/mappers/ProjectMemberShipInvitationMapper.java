package ProjectsManagmentBackEnd.mappers;



import ProjectsManagmentBackEnd.dtos.ProjectMemberShipInvitationDTO;
import ProjectsManagmentBackEnd.entity.ProjectMemberShipInvitation.ProjectMemberShipInvitation;

import java.util.stream.Collectors;

public class ProjectMemberShipInvitationMapper {

    public static ProjectMemberShipInvitationDTO convert(ProjectMemberShipInvitation in) {

        if (in != null) {
            final ProjectMemberShipInvitationDTO out = new ProjectMemberShipInvitationDTO();
            out.setId(in.getId());
            out.setTo(UserMapper.convertShort(in.getTo()));
            out.setFrom(UserMapper.convertShort(in.getFrom()));
            out.setProject(ProjectMapper.convertShort(in.getProject()));
            out.setCreationTime(in.getCreationTime());
            out.setState(in.getState());
            return out;
        }
        return null;
    }
    public static ProjectMemberShipInvitation convert(ProjectMemberShipInvitationDTO in) {

        if (in != null) {
            final ProjectMemberShipInvitation out = new ProjectMemberShipInvitation();
            out.setId(in.getId());
            out.setState(in.getState());
            out.setCreationTime(in.getCreationTime());
            return out;
        }
        return null;
    }
}
