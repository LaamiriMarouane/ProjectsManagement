package ProjectsManagmentBackEnd.repository;

import ProjectsManagmentBackEnd.entity.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,String> {

    Optional<User> findByUsernameOrEmail(String username,String email);
    Page<User> findAll(Pageable pageable);
    Page<User> findAllByUsernameContainingOrEmailContainingOrLastNameOrFirstName(String username, String email,String lastname,String firstname,Pageable pageable);
    List<User> findAllByUsernameContainingOrEmailContainingOrLastNameOrFirstName(String username, String email,String lastname,String firstname);

    boolean existsUserByUsernameOrEmail(String username,String email);


    long countByEnabled(boolean isEnabled);



}
