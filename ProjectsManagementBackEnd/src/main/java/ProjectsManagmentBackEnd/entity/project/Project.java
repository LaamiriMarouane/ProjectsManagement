package ProjectsManagmentBackEnd.entity.project;


import ProjectsManagmentBackEnd.entity.event.Event;
import ProjectsManagmentBackEnd.entity.event.ProjectEvent;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Project {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private String id;

    private String shortName;
    private String longName;
    private String description;
    private String theme;
    private String type;
    private boolean isPublic;
    private boolean isActive;

    private Date lastUpdate;
    @OneToMany(cascade = CascadeType.MERGE,fetch = FetchType.LAZY)
    private Set<ProjectDocs> resources ;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProjectGroup> projectGroups;

    @OneToMany
    private Set<ProjectEvent> events;


}
