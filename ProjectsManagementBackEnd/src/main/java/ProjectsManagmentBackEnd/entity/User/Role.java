package ProjectsManagmentBackEnd.entity.User;


import ProjectsManagmentBackEnd.entity.ProjectRole;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static ProjectsManagmentBackEnd.entity.User.Permission.*;

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

