package ProjectsManagmentBackEnd.dtos.project;

import ProjectsManagmentBackEnd.dtos.ProjectGroupDTO;
import ProjectsManagmentBackEnd.entity.event.Event;
import ProjectsManagmentBackEnd.entity.event.ProjectEvent;
import ProjectsManagmentBackEnd.entity.project.AdminsProjectGroup;
import ProjectsManagmentBackEnd.entity.project.MembersProjectGroup;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
public class ProjectDTO {

    private String id;
    @NotBlank(message = "shortName must not be empty.")
    private String shortName;
    @NotBlank(message = "longName must not be empty.")
    private String longName;
    private String description;

    private String theme;
    private String type;
    private Date lastUpdate;
    private ProjectGroupDTO admins;
    private ProjectGroupDTO members;
    private boolean isPublic;
    private boolean isActive;
    private Set<ProjectEvent> events;
}
