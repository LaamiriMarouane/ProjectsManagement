package ProjectsManagmentBackEnd.dtos.resources;

import lombok.Data;

@Data
public class FileDTO extends ProjectResourceDTO {
    private String fileExtension;
}
