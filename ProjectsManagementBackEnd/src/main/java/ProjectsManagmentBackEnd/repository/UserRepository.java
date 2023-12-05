package ProjectsManagmentBackEnd.repository;

import ProjectsManagmentBackEnd.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,String> {

    Optional<User> findByUsernameOrEmail(String username,String email);
    List<User> findAllByUsernameContainingOrEmailContaining(String username, String email);


    boolean existsUserByUsernameOrEmail(String username,String email);


}
