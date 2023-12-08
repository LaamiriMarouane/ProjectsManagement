package ProjectsManagmentBackEnd.dtos;

import ProjectsManagmentBackEnd.dtos.project.ProjectDTO;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class EventDTO {
    @NotBlank(message = "title must not be empty")
    private String title;
    @NotNull(message = "startDate must not be empty")
    private String start;
    @NotNull(message = "endDate must not be empty")
    private String end;
    @NotBlank(message = "color must not be empty")
    private String color;
    private ProjectDTO project;

}
