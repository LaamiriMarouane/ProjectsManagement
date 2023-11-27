package ProjectsManagmentBackEnd.security;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JwtAuthenticationRequest {
    private static final long serialVersionUID = -8445943548965154778L;

    private String username;
    private String password;
}
