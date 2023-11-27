package ProjectsManagmentBackEnd.dtos.user;

import ProjectsManagmentBackEnd.entity.User.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class UserDTO {
    @NotBlank(message = "username must not be empty")
    private String username;
    @NotBlank()
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\w\\W]{8,}$",message = "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:")
    private String password;
    @NotBlank(message = "confirmationPassword must not be empty")
    private String confirmationPassword;
    @NotBlank(message = "email must not be empty")
    @Email(message = "enter a valid email format")
    private String email;
    private String firstName;
    private String lastName;
    private Role role;


}
