package ProjectsManagmentBackEnd.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class StatisticsResponse {
    private  long usersNumber;
    private  long enabledUsersNumber ;
    private  long disabledUsersNumber ;

    private long projectNumber;
    private long activeProjectsNumber;
    private long inactiveProjectsNumber;
    private  long publicProjects;
    private  long publicProjectsPercentage;
    private  long privateProjects;
    private  long privateProjectsPercentage;

    private  long demandsNumber;
    private  long acceptedDemandsNumber;
    private  long acceptedDemandsNumberPercentage;
    private  long rejectedDemandsNumber;
    private  long rejectedDemandsNumberPercentage;
    private  long newDemandsNumber;
}
