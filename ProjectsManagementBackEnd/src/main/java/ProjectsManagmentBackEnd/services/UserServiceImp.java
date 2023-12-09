package ProjectsManagmentBackEnd.services;


import ProjectsManagmentBackEnd.dtos.user.UserDTO;
import ProjectsManagmentBackEnd.dtos.user.UserShortDTO;
import ProjectsManagmentBackEnd.entity.user.Role;
import ProjectsManagmentBackEnd.entity.user.RoleType;
import ProjectsManagmentBackEnd.entity.user.User;
import ProjectsManagmentBackEnd.exceptions.AuthenticationException;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import ProjectsManagmentBackEnd.mappers.UserMapper;
import ProjectsManagmentBackEnd.repository.RoleRepository;
import ProjectsManagmentBackEnd.repository.UserRepository;
import ProjectsManagmentBackEnd.security.JwtAuthenticationRequest;
import ProjectsManagmentBackEnd.security.JwtAuthenticationResponse;
import ProjectsManagmentBackEnd.services.validation.user.UserValidator;
import ProjectsManagmentBackEnd.utils.JwtTokenUtil;
import ProjectsManagmentBackEnd.utils.JwtUser;
import ProjectsManagmentBackEnd.utils.UserContext;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

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
        user.setUsername(userInfo.getUsername());
        user.setEnabled(true);
      Role role =roleRepository.findByName(RoleType.APP_USER).get();
        //to do set roles *********
       user.setRole(role);
        //to do set roles *********
         userRepository.save(user);
    }

    public ResponseEntity<JwtAuthenticationResponse> login(JwtAuthenticationRequest auth) throws AuthenticationException {


        final UserDetails userDetails = userDetailsService.loadUserByUsername(auth.getUsername());
        authenticate(auth.getUsername(),auth.getPassword());


        final String token = jwtTokenUtil.generateToken(userDetails);

        final String refreshToken = jwtTokenUtil.refreshToken(token);

        return ResponseEntity.ok(new JwtAuthenticationResponse((JwtUser) userDetails,token,refreshToken));
    }



    private void authenticate(String userName ,String password) {
        Objects.requireNonNull(userName);
        Objects.requireNonNull(password);


        try {
            Authentication authenticatedToken=   authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName,password));
            SecurityContextHolder.getContext().setAuthentication(authenticatedToken);
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

    public ResponseEntity<List<UserShortDTO>> search(String subString) {
        User currentUser= UserContext.currentUser();
       List<User> userList= userRepository.findAllByUsernameContainingOrEmailContaining(subString,subString);
       List<UserShortDTO> userShortDTOList=userList.stream()
               .filter(user->!user.getUsername().equals(currentUser.getUsername()))
               .map(UserMapper::convertShort)
               .collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(userShortDTOList);
    }
}
