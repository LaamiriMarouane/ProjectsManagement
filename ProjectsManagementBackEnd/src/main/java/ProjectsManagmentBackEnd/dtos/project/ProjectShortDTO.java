package ProjectsManagmentBackEnd.dtos.project;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
public class ProjectShortDTO {
    private String id;

    private String shortName;

    private String longName;
    private String description;

    private String theme;
    private String type;
    private Date lastUpdate;
}
