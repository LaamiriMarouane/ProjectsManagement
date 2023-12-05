package ProjectsManagmentBackEnd.repository;

import ProjectsManagmentBackEnd.entity.project.ProjectGroup;
import ProjectsManagmentBackEnd.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectGroupRepository  extends JpaRepository<ProjectGroup,String> {
    List<ProjectGroup> findAllByUsersContaining(User user);
}
