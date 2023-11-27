package ProjectsManagmentBackEnd.repository;

import ProjectsManagmentBackEnd.entity.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,String> {

    Optional<User> findByUsernameOrEmail(String username,String email);
    Optional<User> findByUsernameAndEmail(String username,String email);
    Optional<User> findByEmail(String email);

    boolean existsUserByUsernameOrEmail(String username,String email);


}
