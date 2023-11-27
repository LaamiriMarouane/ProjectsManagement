package ProjectsManagmentBackEnd.repository;

import ProjectsManagmentBackEnd.entity.ProjectRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRoleRepository extends JpaRepository<ProjectRole,String> {
}
