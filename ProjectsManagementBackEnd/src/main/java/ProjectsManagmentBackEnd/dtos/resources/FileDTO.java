package ProjectsManagmentBackEnd.dtos.resources;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileDTO extends ProjectResourceDTO {
    private String fileExtension;
}
