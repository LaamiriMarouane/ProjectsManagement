package ProjectsManagmentBackEnd.repository;

import ProjectsManagmentBackEnd.entity.ressources.Folder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FolderResourceRepository extends JpaRepository<Folder , String> {
}
