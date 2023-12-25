package ProjectsManagmentBackEnd.entity.project;


import ProjectsManagmentBackEnd.entity.event.ProjectEvent;
import ProjectsManagmentBackEnd.entity.ressources.Folder;
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
    @Column(unique=true)
    private String shortName;
    private String longName;
    private String description;
    private String theme;
    private String type;
    private boolean isPublic;
    private boolean isActive;

    private Date lastUpdate;
    @OneToOne(cascade = CascadeType.ALL)
    private Folder rootFolder ;

    @OneToOne(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private AdminsProjectGroup admins;

    @OneToOne(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private MembersProjectGroup members;

    @OneToMany
    private Set<ProjectEvent> events;
}
