package ProjectsManagmentBackEnd.repository;

import ProjectsManagmentBackEnd.entity.project.AdminsProjectGroup;
import ProjectsManagmentBackEnd.entity.project.MembersProjectGroup;
import ProjectsManagmentBackEnd.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdminsProjectGroupRepository extends JpaRepository<AdminsProjectGroup,String> {

    List<AdminsProjectGroup> findAllByUsersContaining(User user);
}
