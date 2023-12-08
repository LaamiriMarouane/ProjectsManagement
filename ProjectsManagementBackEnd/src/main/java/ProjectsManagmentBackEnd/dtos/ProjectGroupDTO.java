package ProjectsManagmentBackEnd.dtos;

import ProjectsManagmentBackEnd.dtos.user.UserDTO;
import ProjectsManagmentBackEnd.dtos.user.UserShortDTO;
import ProjectsManagmentBackEnd.entity.project.GroupType;
import ProjectsManagmentBackEnd.entity.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    private GroupType groupType;
    private Set<UserShortDTO> users;
}
