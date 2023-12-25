package ProjectsManagmentBackEnd.dtos.resources;


import ProjectsManagmentBackEnd.entity.project.Project;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
public class FolderDTO extends ProjectResourceDTO {
    private List<ProjectResourceDTO> subResources;
    private Project projectId;
}
