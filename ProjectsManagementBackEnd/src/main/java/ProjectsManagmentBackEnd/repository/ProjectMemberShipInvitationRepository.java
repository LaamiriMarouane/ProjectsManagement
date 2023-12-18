package ProjectsManagmentBackEnd.repository;

import ProjectsManagmentBackEnd.entity.ProjectMemberShipInvitation.ProjectMemberShipInvitation;
import ProjectsManagmentBackEnd.entity.ProjectMemberShipInvitation.ProjectMemberShipInvitationState;
import ProjectsManagmentBackEnd.entity.project.Project;
import ProjectsManagmentBackEnd.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectMemberShipInvitationRepository   extends JpaRepository<ProjectMemberShipInvitation,String> {

    List<ProjectMemberShipInvitation> findAllByFromAndProjectAndState(User user, Project project,ProjectMemberShipInvitationState state);
    List<ProjectMemberShipInvitation> findAllByToAndState(User user, ProjectMemberShipInvitationState state);
    Optional<ProjectMemberShipInvitation> findByIdAndTo(String id,User user);
}
