package ProjectsManagmentBackEnd.controllers.user;


import ProjectsManagmentBackEnd.dtos.user.UserDTO;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import ProjectsManagmentBackEnd.holders.ApiPaths;
import ProjectsManagmentBackEnd.security.JwtAuthenticationRequest;
import ProjectsManagmentBackEnd.security.JwtAuthenticationResponse;
import ProjectsManagmentBackEnd.services.UserServiceImp;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.naming.AuthenticationException;


@RestController
@RequestMapping(ApiPaths.V1)
@AllArgsConstructor
public class UserController {


    private UserServiceImp userService;

  //  private PasswordResetServiceImp passwordResetServiceImp;

   @PostMapping(ApiPaths.AUTH)
    public ResponseEntity<JwtAuthenticationResponse> createAuthenticationToken(@RequestBody JwtAuthenticationRequest auth) throws AuthenticationException {
      return userService.login(auth);

    }



    @PostMapping(ApiPaths.REGISTER )
    public  void register(@RequestBody UserDTO userInfo) throws BusinessException {
            userService.register(userInfo);
    }



   /* @PostMapping(ApiPaths.FORGOT_RESET )
    public  String sendEmail(@RequestBody ForgotPasswordRequest forgotPasswordRequest) throws BusinessException {
      return passwordResetServiceImp.resetPassword(forgotPasswordRequest.getEmail());
    }
    @PostMapping(ApiPaths.PASSWORD_RESET )
    public  String  updatePassword(@RequestBody PasswordResetRequest req) throws BusinessException {


       // return passwordResetServiceImp.UpdatePassword(req.getToken(), req.getUserName(),"Aa45758Z_dd");
        return passwordResetServiceImp.UpdatePassword(req);


}

*/














}
