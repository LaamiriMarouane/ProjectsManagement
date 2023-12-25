package ProjectsManagmentBackEnd.dtos.resources;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectResourceDTO {
    private String id;
    private String name;
    private String parentId;
}
