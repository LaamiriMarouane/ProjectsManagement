package ProjectsManagmentBackEnd.dtos;

import ProjectsManagmentBackEnd.dtos.project.ProjectShortDTO;
import ProjectsManagmentBackEnd.dtos.user.UserShortDTO;
import ProjectsManagmentBackEnd.entity.ProjectMemberShipInvitation.ProjectMemberShipInvitationState;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.Date;
@Data
public class ProjectMemberShipInvitationDTO {
    private String id;

    @NotBlank(message = "project is required")
    private ProjectShortDTO project;

    private UserShortDTO from;

    @NotBlank(message = "project is required")
    private UserShortDTO to;

    private ProjectMemberShipInvitationState state;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date creationTime;
}
