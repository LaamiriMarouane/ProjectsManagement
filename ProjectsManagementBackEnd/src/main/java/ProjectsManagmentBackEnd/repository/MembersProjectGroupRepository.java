package ProjectsManagmentBackEnd.repository;

import ProjectsManagmentBackEnd.entity.project.AdminsProjectGroup;
import ProjectsManagmentBackEnd.entity.project.MembersProjectGroup;
import ProjectsManagmentBackEnd.entity.project.ProjectGroup;
import ProjectsManagmentBackEnd.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MembersProjectGroupRepository extends JpaRepository<MembersProjectGroup,String> {
    List<MembersProjectGroup> findAllByUsersContaining(User user);
}
