package ProjectsManagmentBackEnd.entity;

import ProjectsManagmentBackEnd.entity.project.ProjectGroup;
import ProjectsManagmentBackEnd.entity.user.Role;
import ProjectsManagmentBackEnd.entity.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ProjectRole {
        @Id
        @GeneratedValue(generator = "uuid2")
        @GenericGenerator(name = "uuid2", strategy = "uuid2")
        private String id;
        @OneToOne
        private Role role;
        @ManyToOne(cascade = CascadeType.MERGE,fetch = FetchType.LAZY)
        private ProjectGroup group;
        @ManyToOne(cascade = CascadeType.MERGE,fetch = FetchType.LAZY)
        private User user;
}
