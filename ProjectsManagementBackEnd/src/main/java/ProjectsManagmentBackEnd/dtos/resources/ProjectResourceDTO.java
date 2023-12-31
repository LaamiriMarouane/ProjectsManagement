package ProjectsManagmentBackEnd.dtos.resources;

import ProjectsManagmentBackEnd.entity.ressources.ResourceType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectResourceDTO {
    private String id;
    private String name;
    private String parentId;
    private ResourceType type;
}
