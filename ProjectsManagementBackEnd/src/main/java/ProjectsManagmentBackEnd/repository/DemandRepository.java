package ProjectsManagmentBackEnd.repository;

import ProjectsManagmentBackEnd.entity.demand.Demand;
import ProjectsManagmentBackEnd.entity.demand.DemandState;
import ProjectsManagmentBackEnd.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface DemandRepository extends JpaRepository<Demand,String> {

    // Method to find demands by demandState being either REJECTED or COMPLETED
    List<Demand> findByDemandStateIn(List<DemandState> demandStates);
    Optional<List<Demand>> findAllByUser(User user);
    Optional<List<Demand>> findAllByUserAndDemandState(User user, DemandState demandState);
    Optional<List<Demand>> findAllByDemandState(DemandState demandState);

    long countAllByDemandState(DemandState demandState);
}
