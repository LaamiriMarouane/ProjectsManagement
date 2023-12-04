package ProjectsManagmentBackEnd.services;


import ProjectsManagmentBackEnd.dtos.user.UserDTO;
import ProjectsManagmentBackEnd.entity.user.Role;
import ProjectsManagmentBackEnd.entity.user.RoleType;
import ProjectsManagmentBackEnd.entity.user.User;
import ProjectsManagmentBackEnd.exceptions.AuthenticationException;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import ProjectsManagmentBackEnd.repository.RoleRepository;
import ProjectsManagmentBackEnd.repository.UserRepository;
import ProjectsManagmentBackEnd.security.JwtAuthenticationRequest;
import ProjectsManagmentBackEnd.security.JwtAuthenticationResponse;
import ProjectsManagmentBackEnd.services.validation.user.UserValidator;
import ProjectsManagmentBackEnd.utils.JwtTokenUtil;
import ProjectsManagmentBackEnd.utils.JwtUser;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@AllArgsConstructor
public class UserServiceImp {
    private UserRepository userRepository;

    private RoleRepository roleRepository;

    private PasswordEncoder passwordEncoder;

    private UserValidator userValidator;

    private AuthenticationManager authenticationManager;

    private JwtTokenUtil jwtTokenUtil;

    private UserDetailsService userDetailsService;

    public void register(UserDTO userInfo) throws BusinessException {
       userValidator.userValide(userInfo);
        User user=new User();
        user.setFirstName(userInfo.getFirstName());
        user.setLastName(userInfo.getLastName());
        user.setEmail(userInfo.getEmail());
        user.setPassword(passwordEncoder.encode(userInfo.getPassword()));
        user.setUsername(userInfo.getUserName());
        user.setEnabled(true);
      Role role =roleRepository.findByName(RoleType.APP_USER).get();
        //to do set roles *********
       user.setRole(role);
        //to do set roles *********
         userRepository.save(user);
    }

    public ResponseEntity<JwtAuthenticationResponse> login(JwtAuthenticationRequest auth) throws AuthenticationException {

        authenticate(auth.getUsername(), auth.getPassword());

        final UserDetails userDetails = userDetailsService.loadUserByUsername(auth.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        final String refreshToken = jwtTokenUtil.refreshToken(token);

        return ResponseEntity.ok(new JwtAuthenticationResponse((JwtUser) userDetails,token,refreshToken));
    }



    private void authenticate(String username, String password) {
        Objects.requireNonNull(username);
        Objects.requireNonNull(password);

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new AuthenticationException("User is disabled!", e);
        } catch (BadCredentialsException e) {
            throw new AuthenticationException("Bad credentials!", e);
        }catch (UnsupportedOperationException e) {
            e.printStackTrace(); // Add this line to print the stack trace
            throw new AuthenticationException("Unsupported operation!", e);
        }
        catch (Exception e){
            System.out.println("msg->"+e);
        }
    }
}
