package ProjectsManagmentBackEnd.repository;

import ProjectsManagmentBackEnd.entity.User.Role;
import ProjectsManagmentBackEnd.entity.User.RoleType;
import ProjectsManagmentBackEnd.entity.User.User;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role,String> {
    Optional<Role> findByName(RoleType roleType);


}
