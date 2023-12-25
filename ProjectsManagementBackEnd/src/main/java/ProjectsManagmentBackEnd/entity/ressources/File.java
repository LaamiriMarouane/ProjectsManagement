package ProjectsManagmentBackEnd.entity.ressources;

import ProjectsManagmentBackEnd.entity.project.ProjectResource;
import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Getter
@Setter
public class File extends ProjectResource {
    private String fileExtension;
}
