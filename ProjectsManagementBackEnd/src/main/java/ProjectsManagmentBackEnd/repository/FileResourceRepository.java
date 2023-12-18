package ProjectsManagmentBackEnd.repository;

import ProjectsManagmentBackEnd.entity.ressources.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileResourceRepository extends JpaRepository<File , String> {
}
