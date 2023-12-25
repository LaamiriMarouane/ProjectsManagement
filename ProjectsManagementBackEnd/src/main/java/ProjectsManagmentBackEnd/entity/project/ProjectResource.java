package ProjectsManagmentBackEnd.entity.project;


import ProjectsManagmentBackEnd.entity.ressources.Folder;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;



@Data
@Entity
@Inheritance( strategy = InheritanceType.TABLE_PER_CLASS )
public abstract class ProjectResource {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    protected String id;
    protected  String name;
    protected  String path;
    @ManyToOne
    private Folder parentFolder;
}
