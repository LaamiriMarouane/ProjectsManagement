package ProjectsManagmentBackEnd.entity.ressources;

import ProjectsManagmentBackEnd.entity.project.Project;
import ProjectsManagmentBackEnd.entity.project.ProjectResource;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Folder extends ProjectResource {
    @OneToMany( mappedBy = "parentFolder" ,fetch = FetchType.LAZY , cascade = CascadeType.ALL)
    private List<ProjectResource> subResources = new ArrayList<>();
    @OneToOne
    private Project project;
}
