package ProjectsManagmentBackEnd.dtos;

import ProjectsManagmentBackEnd.entity.Event;
import ProjectsManagmentBackEnd.entity.ProjectGroup;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.annotations.GenericGenerator;

import java.util.Set;

public class ProjectDTO {

    private String id;
    @NotBlank(message = "shortName must not be empty")
    private String shortName;
    @NotBlank(message = "longName must not be empty")
    private String longName;
    private String description;

    private String theme;
    private String type;
    private boolean isPublic;
    private boolean isActive;

    private ProjectGroup adminsGroup;
    private  ProjectGroup membersGroup;
    private Set<Event> events;
}
