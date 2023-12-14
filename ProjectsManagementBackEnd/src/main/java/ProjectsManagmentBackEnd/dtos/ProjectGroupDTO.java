package ProjectsManagmentBackEnd.dtos;

import ProjectsManagmentBackEnd.dtos.user.UserShortDTO;
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

    private Set<UserShortDTO> users;
}
