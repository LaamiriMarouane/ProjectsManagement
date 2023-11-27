package ProjectsManagmentBackEnd.security.service;


import ProjectsManagmentBackEnd.repository.UserRepository;
import ProjectsManagmentBackEnd.utils.JwtUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImp  implements UserDetailsService {

    private UserRepository userRepository;



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        return      userRepository.findByUsernameOrEmail(username,username).map(JwtUser::new)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("No user found with username '%s'.", username)));
    }



}

