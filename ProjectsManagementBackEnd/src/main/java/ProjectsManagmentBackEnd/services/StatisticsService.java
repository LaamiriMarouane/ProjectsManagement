package ProjectsManagmentBackEnd.services;

import ProjectsManagmentBackEnd.dtos.StatisticsResponse;
import ProjectsManagmentBackEnd.entity.demand.DemandState;
import ProjectsManagmentBackEnd.repository.DemandRepository;
import ProjectsManagmentBackEnd.repository.ProjectRepository;
import ProjectsManagmentBackEnd.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class StatisticsService {
     private UserRepository userRepository;
    private ProjectRepository projectRepository;
    private DemandRepository demandRepository;

   public ResponseEntity<StatisticsResponse> getAll(){
        //temporary solutions ;
           long usersNumber=userRepository.count();
          long enabledUsersNumber=userRepository.countByEnabled(true) ;
          long disabledUsersNumber=userRepository.countByEnabled(false) ;

         long projectNumber=projectRepository.count();
         long activeProjectsNumber=projectRepository.countAllByIsActive(true);
         long inactiveProjectsNumber=projectRepository.countAllByIsActive(false);
          long publicProjects=projectRepository.countAllByIsPublic(true);
          long privateProjects=projectRepository.countAllByIsPublic(false);

          long demandsNumber=demandRepository.count();
          long acceptedDemandsNumber=demandRepository.countAllByDemandState(DemandState.COMPLETED);
          long rejectedDemandsNumber=demandRepository.countAllByDemandState(DemandState.REJECTED);
          long newDemandsNumber=demandRepository.countAllByDemandState(DemandState.NEW);
         StatisticsResponse statisticsResponse=new  StatisticsResponse();

         statisticsResponse.setUsersNumber(usersNumber);
         statisticsResponse.setEnabledUsersNumber(enabledUsersNumber);
         statisticsResponse.setDisabledUsersNumber(disabledUsersNumber);

         statisticsResponse.setProjectNumber(projectNumber);
         statisticsResponse.setPublicProjects(publicProjects );
         statisticsResponse.setPrivateProjects(privateProjects);
         statisticsResponse.setActiveProjectsNumber( activeProjectsNumber );
         statisticsResponse.setInactiveProjectsNumber(inactiveProjectsNumber);

         statisticsResponse.setDemandsNumber(demandsNumber);
         statisticsResponse.setAcceptedDemandsNumber(acceptedDemandsNumber);
         statisticsResponse.setRejectedDemandsNumber(rejectedDemandsNumber);
         statisticsResponse.setNewDemandsNumber(newDemandsNumber);

         return  ResponseEntity.status(HttpStatus.OK).body(statisticsResponse);
    }



}
