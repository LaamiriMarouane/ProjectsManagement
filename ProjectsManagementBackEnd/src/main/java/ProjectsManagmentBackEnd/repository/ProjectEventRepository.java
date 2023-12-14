package ProjectsManagmentBackEnd.repository;

import ProjectsManagmentBackEnd.entity.event.ProjectEvent;
import ProjectsManagmentBackEnd.entity.project.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectEventRepository extends JpaRepository<ProjectEvent,String> {
    List<ProjectEvent> findAllByStartDate(String formattedDate);
    List<ProjectEvent> findAllByProject(Project project);

}
