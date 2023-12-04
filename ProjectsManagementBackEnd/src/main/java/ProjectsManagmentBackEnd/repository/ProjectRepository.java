package ProjectsManagmentBackEnd.repository;

import ProjectsManagmentBackEnd.entity.Project;
import ProjectsManagmentBackEnd.entity.ProjectGroup;
import ProjectsManagmentBackEnd.entity.user.User;
import org.springframework.context.annotation.DeferredImportSelector;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ProjectRepository extends JpaRepository<Project,String> {
    List<Project> findAllByMembersGroupInOrAdminsGroupIn(List<ProjectGroup> memberGroups,List<ProjectGroup> adminGroups);

}
