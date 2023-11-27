package ProjectsManagmentBackEnd.dtos;

import ProjectsManagmentBackEnd.dtos.user.UserDTO;
import ProjectsManagmentBackEnd.entity.Project;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
public class ProjectGroupDTO {

    private String id;
    private  String groupName;
    private Project project;
    private Set<UserDTO> users;
}
