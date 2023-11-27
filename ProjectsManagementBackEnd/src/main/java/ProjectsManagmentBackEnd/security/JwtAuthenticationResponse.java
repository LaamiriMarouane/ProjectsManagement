package ProjectsManagmentBackEnd.security;

import ProjectsManagmentBackEnd.utils.JwtUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class JwtAuthenticationResponse {
    private static final long serialVersionUID = 1250166508152483573L;

    private final JwtUser user;
    private final String accessToken;
    private final String refreshToken;





}
