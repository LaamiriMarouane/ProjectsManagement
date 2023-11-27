package ProjectsManagmentBackEnd.entity;

import ProjectsManagmentBackEnd.entity.User.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ProjectGroup {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private String id;
    private  String groupName;
    @OneToOne
    private Project project;
  @ManyToMany(cascade = CascadeType.MERGE,fetch = FetchType.LAZY)
   @JoinTable(
           name = "user_project_group",
           joinColumns = @JoinColumn(name = "group_id"),
           inverseJoinColumns = @JoinColumn(name = "user_id")
   )
    private Set<User> users;

}
