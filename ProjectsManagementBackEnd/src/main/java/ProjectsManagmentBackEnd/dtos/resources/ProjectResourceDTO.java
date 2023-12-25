package ProjectsManagmentBackEnd.dtos.resources;


import lombok.Data;

@Data
public class ProjectResourceDTO {
    private String id;
    private String name;
    private String parentId;
}
