package ProjectsManagmentBackEnd.repository;

import ProjectsManagmentBackEnd.entity.demand.Demand;
import ProjectsManagmentBackEnd.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DemandRepository extends JpaRepository<Demand,String> {
    Optional<List<Demand>> findAllByUser(User user);
}
