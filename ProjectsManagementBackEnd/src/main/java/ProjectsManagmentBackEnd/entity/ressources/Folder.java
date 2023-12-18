package ProjectsManagmentBackEnd.entity.ressources;

import ProjectsManagmentBackEnd.entity.project.ProjectResource;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Folder extends ProjectResource {
    @OneToMany(mappedBy = "parentFolder", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Folder> subFolders;

    @OneToMany(mappedBy = "parentFolder", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<File> files;

    @ManyToOne
    @JoinColumn(name = "parent_folder_id")
    private Folder parentFolder;

    @Enumerated(EnumType.STRING)
    private FileType fileType;
}
