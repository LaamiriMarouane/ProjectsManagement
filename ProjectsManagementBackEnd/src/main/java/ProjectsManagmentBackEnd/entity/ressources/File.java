package ProjectsManagmentBackEnd.entity.ressources;

import ProjectsManagmentBackEnd.entity.project.ProjectResource;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Data
public class File extends ProjectResource {
    private String fileExtension;
}
