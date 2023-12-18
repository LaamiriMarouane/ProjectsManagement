package ProjectsManagmentBackEnd.entity.ressources;

import ProjectsManagmentBackEnd.entity.project.ProjectResource;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class File extends ProjectResource {

    private String fileExtension;

    @ManyToOne
    @JoinColumn(name = "parent_folder_id")
    private Folder parentFolder;

}
