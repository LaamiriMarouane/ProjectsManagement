package ProjectsManagmentBackEnd.repository;

import ProjectsManagmentBackEnd.entity.demand.Demand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DemandRepository extends JpaRepository<Demand,String> {
}
