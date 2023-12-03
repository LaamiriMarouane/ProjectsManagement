package ProjectsManagmentBackEnd.dtos;

import ProjectsManagmentBackEnd.entity.demand.DemandState;
import ProjectsManagmentBackEnd.entity.user.User;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Setter
@Getter
@NoArgsConstructor
public class DemandDTO {
    private String id;

    @NotBlank(message = "projectName must not be empty")
    private String projectName;
    private String description;

    private User user;

    private DemandState demandState;

    private Timestamp validationTime;

    private Timestamp demandCreatingTime;
}
