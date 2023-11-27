package ProjectsManagmentBackEnd.dtos.user;

import ProjectsManagmentBackEnd.entity.ProjectRole;
import ProjectsManagmentBackEnd.entity.User.Permission;
import ProjectsManagmentBackEnd.entity.User.RoleType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.Set;
@Setter
@Getter
@NoArgsConstructor
public class RoleDTO {
    private String id;

    private RoleType name;

    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated
    private Set<Permission> permissions;


    @OneToOne
    private ProjectRole projectRole;
}
