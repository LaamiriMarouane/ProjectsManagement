package ProjectsManagmentBackEnd.dtos.resources;


import ProjectsManagmentBackEnd.entity.project.Project;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class FolderDTO extends ProjectResourceDTO {
    private List<ProjectResourceDTO> subResources;
    private Project projectId;
}
