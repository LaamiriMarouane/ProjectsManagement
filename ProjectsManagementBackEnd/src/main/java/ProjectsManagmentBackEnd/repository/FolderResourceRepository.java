package ProjectsManagmentBackEnd.repository;

import ProjectsManagmentBackEnd.entity.project.ProjectResource;
import ProjectsManagmentBackEnd.entity.ressources.Folder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface FolderResourceRepository extends JpaRepository<Folder , String> {
    @Query("SELECT f.subResources FROM Folder f WHERE f.id = :folderId")
    List<ProjectResource> findSubResourcesByFolderId(@Param("folderId") String folderId);
    @Query("SELECT f FROM Folder f WHERE f.parentFolder IS NULL")
    Folder findRootFolder();
    Optional<Folder> findByName(String name);

}
