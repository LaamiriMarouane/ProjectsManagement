package ProjectsManagmentBackEnd.repository;

import ProjectsManagmentBackEnd.entity.event.UserEvent;
import ProjectsManagmentBackEnd.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface UserEventRepository extends JpaRepository<UserEvent,String> {
        List<UserEvent> findAllByUserAndStartDate(User user, String formattedDate);
        List<UserEvent> findAllByUser(User user);


}
