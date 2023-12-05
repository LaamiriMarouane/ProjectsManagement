package ProjectsManagmentBackEnd.dtos;

import ProjectsManagmentBackEnd.entity.Event;
import ProjectsManagmentBackEnd.entity.project.ProjectGroup;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private List<ProjectGroupDTO> projectGroups;
    private Set<Event> events;
}
