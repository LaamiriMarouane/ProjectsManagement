package ProjectsManagmentBackEnd.repository;

import ProjectsManagmentBackEnd.entity.project.AdminsProjectGroup;
import ProjectsManagmentBackEnd.entity.project.MembersProjectGroup;
import ProjectsManagmentBackEnd.entity.project.Project;
import ProjectsManagmentBackEnd.entity.project.ProjectGroup;
import ProjectsManagmentBackEnd.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project,String> {
  @Query("SELECT DISTINCT p FROM Project p WHERE EXISTS (SELECT 1 FROM AdminsProjectGroup apg WHERE apg IN :adminGroups AND apg.project = p) OR EXISTS (SELECT 1 FROM MembersProjectGroup mpg WHERE mpg IN :memberGroups AND mpg.project = p)")
  List<Project> findProjectsByAdminOrMember(@Param("adminGroups") List<AdminsProjectGroup> adminGroups, @Param("memberGroups") List<MembersProjectGroup> memberGroups);

  List<Project> findAllByIsPublicIsAndIsActiveIs(boolean isPublic,boolean isActive);

}
