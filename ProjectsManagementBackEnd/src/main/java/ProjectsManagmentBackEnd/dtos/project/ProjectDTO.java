package ProjectsManagmentBackEnd.dtos.project;

import ProjectsManagmentBackEnd.dtos.ProjectGroupDTO;
import ProjectsManagmentBackEnd.entity.event.Event;
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
    private boolean isPublic;
    private boolean isActive;
    private List<ProjectGroupDTO> projectGroups;
    private Set<Event> events;
}
