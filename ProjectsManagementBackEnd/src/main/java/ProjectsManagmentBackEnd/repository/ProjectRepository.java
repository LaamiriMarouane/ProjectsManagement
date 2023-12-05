package ProjectsManagmentBackEnd.repository;

import ProjectsManagmentBackEnd.entity.project.Project;
import ProjectsManagmentBackEnd.entity.project.ProjectGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project,String> {
  @Query("SELECT e FROM Project e WHERE EXISTS (SELECT el FROM e.projectGroups el WHERE el IN :groupUsers)")
  List<Project> findAllByProjectGroupsContaining(List<ProjectGroup> groupUsers);
  List<Project> findAllByIsPublicIsAndIsActiveIs(boolean isPublic,boolean isActive);

}
