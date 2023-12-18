package ProjectsManagmentBackEnd.services;

import ProjectsManagmentBackEnd.dtos.user.UserDTO;
import ProjectsManagmentBackEnd.entity.user.Permission;
import ProjectsManagmentBackEnd.entity.user.Role;
import ProjectsManagmentBackEnd.entity.user.RoleType;
import ProjectsManagmentBackEnd.entity.user.User;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import ProjectsManagmentBackEnd.repository.RoleRepository;
import ProjectsManagmentBackEnd.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;


@Service
@AllArgsConstructor
@Order(1)
public class RoleServiceImp {
    private RoleRepository roleRepository;
    private UserRepository userRepository;
    private  UserServiceImp userServiceImp;
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() throws BusinessException {
        Role appUser = initializeRole(RoleType.APP_USER);
        Role appAdmin = initializeRole(RoleType.APP_ADMIN);

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



        roleGuest.setPermissions(Set.of(Permission.GUEST_READ));

        roleRepository.saveAll(List.of(appUser, appAdmin,roleGuest));
       UserDTO userDTO= new UserDTO();
       userDTO.setEmail("marwnev@gmail.com");
       userDTO.setFirstName("admin");
        userDTO.setLastName("admin");
        userDTO.setUsername("admin");
       userDTO.setPassword("eE123456_a");
       userDTO.setConfirmationPassword("eE123456_a");
        userServiceImp.register(userDTO,RoleType.APP_ADMIN);

        User guest=new User();
        guest.setFirstName("guest");
        guest.setLastName("guest");
        guest.setEmail("guest");
        guest.setPassword(passwordEncoder.encode("guest"));
        guest.setUsername("guest");
        guest.setEnabled(true);
        Role role =roleRepository.findByName(RoleType.GUEST).get();
        guest.setRole(role);
        userRepository.save(guest);

    }

    private Role initializeRole(RoleType roleType) {
        Role role = new Role();
        role.setName(roleType);
        return role;



    }

    public  Role projectMemberRole(){
        Role projectManager = initializeRole(RoleType.PROJECT_MEMBER);
        projectManager.setPermissions(Set.of(
                Permission.PROJECT_MEMBER_CREATE,
                Permission.PROJECT_MEMBER_READ,
                Permission.PROJECT_MEMBER_UPDATE,
                Permission.PROJECT_MEMBER_DELETE
        ));
        return projectManager;

    }
    public  Role projectAdminRole(){
        Role projectAdmin = initializeRole(RoleType.PROJECT_ADMIN);
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
        return  projectAdmin;

    }
    public  Role projectOwnerRole(){
        Role projectOwner = initializeRole(RoleType.PROJECT_OWNER);
        projectOwner.setPermissions(Set.of(
                Permission.PROJECT_OWNER_CREATE,
                Permission.PROJECT_OWNER_DELETE,
                Permission.PROJECT_OWNER_UPDATE,
                Permission.PROJECT_OWNER_READ,
                Permission.PROJECT_ADMIN_READ,
                Permission.PROJECT_ADMIN_CREATE,
                Permission.PROJECT_ADMIN_UPDATE,
                Permission.PROJECT_ADMIN_DELETE,
                Permission.PROJECT_MEMBER_CREATE,
                Permission.PROJECT_MEMBER_READ,
                Permission.PROJECT_MEMBER_UPDATE,
                Permission.PROJECT_MEMBER_DELETE
        ));
        return  projectOwner;
    }

}
