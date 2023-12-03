package ProjectsManagmentBackEnd.services;

import ProjectsManagmentBackEnd.entity.user.Permission;
import ProjectsManagmentBackEnd.entity.user.Role;
import ProjectsManagmentBackEnd.entity.user.RoleType;
import ProjectsManagmentBackEnd.repository.RoleRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;


@Service
@AllArgsConstructor
public class RoleServiceImp {
    private RoleRepository roleRepository;

    @PostConstruct
    public void initRoles() {
        Role appUser = initializeRole(RoleType.APP_USER);
        Role appAdmin = initializeRole(RoleType.APP_ADMIN);
        Role projectAdmin = initializeRole(RoleType.PROJECT_ADMIN);
        Role projectManager = initializeRole(RoleType.PROJECT_MEMBER);
        Role roleGuest = initializeRole(RoleType.GUEST);

        // Add permissions to roles
        appUser.setPermissions(Set.of(Permission.APP_USER_READ));
        appAdmin.setPermissions(Set.of(
                Permission.APP_ADMIN_CREATE,
                Permission.APP_ADMIN_READ,
                Permission.APP_ADMIN_UPDATE,
                Permission.APP_ADMIN_DELETE,
                Permission.PROJECT_ADMIN_READ,
                Permission.PROJECT_ADMIN_CREATE,
                Permission.PROJECT_ADMIN_UPDATE,
                Permission.PROJECT_ADMIN_DELETE,
                Permission.PROJECT_MEMBER_CREATE,
                Permission.PROJECT_MEMBER_READ,
                Permission.PROJECT_MEMBER_UPDATE,
                Permission.PROJECT_MEMBER_DELETE
        ));
        projectAdmin.setPermissions(Set.of(
                Permission.PROJECT_ADMIN_READ,
                Permission.PROJECT_ADMIN_CREATE,
                Permission.PROJECT_ADMIN_UPDATE,
                Permission.PROJECT_ADMIN_DELETE,
                Permission.PROJECT_MEMBER_CREATE,
                Permission.PROJECT_MEMBER_READ,
                Permission.PROJECT_MEMBER_UPDATE,
                Permission.PROJECT_MEMBER_DELETE
        ));
        projectManager.setPermissions(Set.of(
                Permission.PROJECT_MEMBER_CREATE,
                Permission.PROJECT_MEMBER_READ,
                Permission.PROJECT_MEMBER_UPDATE,
                Permission.PROJECT_MEMBER_DELETE
        ));
        roleGuest.setPermissions(Set.of(Permission.GUEST_READ));

        roleRepository.saveAll(List.of(appUser, appAdmin, projectAdmin, projectManager, roleGuest));
    }

    private Role initializeRole(RoleType roleType) {
        return (Role) roleRepository.findByName(roleType)
                .orElseGet(() -> {
                    Role role = new Role();
                    role.setName(roleType);
                    return roleRepository.save(role);
                });
    }
}
