package ProjectsManagmentBackEnd.dtos.user;

import ProjectsManagmentBackEnd.entity.user.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class UserShortDTO {
    private String id;
    private String username;
    //private String email;
    private String email;
}
