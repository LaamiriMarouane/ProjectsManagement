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
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.core.annotation.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Order(2)
public class UserServiceImp {
    private UserRepository userRepository;

    private RoleRepository roleRepository;

    private PasswordEncoder passwordEncoder;

    private UserValidator userValidator;

    private AuthenticationManager authenticationManager;

    private JwtTokenUtil jwtTokenUtil;

    private UserDetailsService userDetailsService;



    public void register(UserDTO userInfo,RoleType userRole) throws BusinessException {
        if(userRole!=RoleType.GUEST){
       userValidator.userValide(userInfo);
        }
        User user=new User();
        user.setFirstName(userInfo.getFirstName());
        user.setLastName(userInfo.getLastName());
        user.setEmail(userInfo.getEmail());
        user.setPassword(passwordEncoder.encode(userInfo.getPassword()));
        user.setUsername(userInfo.getUsername());
        user.setEnabled(true);
      Role role =roleRepository.findByName(userRole).get();
        //to do set roles *********
       user.setRole(role);
        //to do set roles *********
         userRepository.save(user);
    }

    public ResponseEntity<JwtAuthenticationResponse> login(JwtAuthenticationRequest auth) throws AuthenticationException {
        authenticate(auth.getUsername(),auth.getPassword());
        final UserDetails userDetails = userDetailsService.loadUserByUsername(auth.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        final String refreshToken = jwtTokenUtil.refreshToken(token);

        return ResponseEntity.ok(new JwtAuthenticationResponse((JwtUser) userDetails,token,refreshToken));
    }


    public ResponseEntity getAll(String subString ,int page ,int size) {
        Pageable pageable= PageRequest.of(page, size);
        Page<User> usersPage;
        if(subString!=null && !subString.equals("")){
            usersPage=  userRepository.findAllByUsernameContainingOrEmailContainingOrLastNameOrFirstName(subString,subString,subString,subString,pageable);

        }else{
            usersPage=  userRepository.findAll(pageable);
        }
        User currentUser=UserContext.currentUser();
        List<UserDTO> userDTOList=usersPage.getContent().stream()
               .filter(user->!user.getUsername().equals(currentUser.getUsername()) && !user.getUsername().equals("admin"))
               .map(UserMapper::convert)
               .collect(Collectors.toList());
        Map response=new HashMap<>();
        response.put("users",userDTOList);
        response.put("currentPage", usersPage.getNumber());
        response.put("totalRows", usersPage.getTotalElements());
        response.put("totalPages", usersPage.getTotalPages());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    public JwtAuthenticationResponse updateAuthoritiesForUser(Role role) throws BusinessException {
        Authentication existingAuthentication =  SecurityContextHolder.getContext().getAuthentication();
        if (existingAuthentication != null && existingAuthentication.getPrincipal() instanceof UserDetails) {

            JwtUser currentUser = (JwtUser) existingAuthentication.getPrincipal();
            currentUser.setRole(role);

            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(currentUser, null, currentUser.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            final String token = jwtTokenUtil.generateToken(currentUser);
            final String refreshToken = jwtTokenUtil.refreshToken(token);
            return new JwtAuthenticationResponse(currentUser, token, refreshToken);
        }else{
            Map error=  new HashMap();
            error.put("error","in updating the user authorities.");
            throw  new BusinessException("error",1111, error);
        }
    }

    private void authenticate(String userName ,String password) {
        Objects.requireNonNull(userName);
        Objects.requireNonNull(password);


        try {
             authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName,password));
        }catch (UsernameNotFoundException ex) {
            throw new AuthenticationException("User is not found!", ex);
        }
        catch (DisabledException e) {
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
