package ProjectsManagmentBackEnd.repository;

import ProjectsManagmentBackEnd.entity.user.Role;
import ProjectsManagmentBackEnd.entity.user.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role,String> {
    Optional<Role> findByName(RoleType roleType);


}
