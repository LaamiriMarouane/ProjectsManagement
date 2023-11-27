package ProjectsManagmentBackEnd.repository;

import ProjectsManagmentBackEnd.entity.ProjectGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectGroupRepository  extends JpaRepository<ProjectGroup,String> {
}
