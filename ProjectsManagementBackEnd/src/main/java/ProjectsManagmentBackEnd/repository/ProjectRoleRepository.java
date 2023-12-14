package ProjectsManagmentBackEnd.repository;

import ProjectsManagmentBackEnd.entity.ProjectRole;
import ProjectsManagmentBackEnd.entity.project.ProjectGroup;
import ProjectsManagmentBackEnd.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectRoleRepository extends JpaRepository<ProjectRole,String> {
    Optional<ProjectRole> findByUserAndGroup(User user , ProjectGroup projectGroup);
}
