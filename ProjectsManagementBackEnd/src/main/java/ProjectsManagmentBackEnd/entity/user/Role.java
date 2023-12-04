package ProjectsManagmentBackEnd.entity.user;


import ProjectsManagmentBackEnd.entity.ProjectRole;
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
@Table(name = "role")
public class Role {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private String id;

    private RoleType name;

    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated
    private Set<Permission>permissions;


    @OneToOne
    private ProjectRole projectRole;


}

