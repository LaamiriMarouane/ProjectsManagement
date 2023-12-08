package ProjectsManagmentBackEnd.repository;

import ProjectsManagmentBackEnd.entity.ProjectMemberShipInvitation.ProjectMemberShipInvitation;
import ProjectsManagmentBackEnd.entity.project.Project;
import ProjectsManagmentBackEnd.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectMemberShipInvitationRepository   extends JpaRepository<ProjectMemberShipInvitation,String> {

    List<ProjectMemberShipInvitation> findAllByFromAndProject(User user, Project project);
    List<ProjectMemberShipInvitation> findAllByTo(User user);
    Optional<ProjectMemberShipInvitation> findByIdAndTo(String id,User user);
}
