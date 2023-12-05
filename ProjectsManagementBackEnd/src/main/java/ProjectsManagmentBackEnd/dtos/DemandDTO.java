package ProjectsManagmentBackEnd.dtos;

import ProjectsManagmentBackEnd.dtos.user.UserDTO;
import ProjectsManagmentBackEnd.dtos.user.UserShortDTO;
import ProjectsManagmentBackEnd.entity.demand.DemandState;
import ProjectsManagmentBackEnd.entity.user.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
public class DemandDTO {
    private String id;

    @NotBlank(message = "projectName must not be empty.")
    private String projectName;

    private String projectLongName;

    private String description;

    private String type;

    private String theme;

    @NotNull(message = "project is public must not be null.")
    private boolean isPublic;

    private UserShortDTO user;

    private DemandState demandState;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date validationTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date demandCreatingTime;
}
