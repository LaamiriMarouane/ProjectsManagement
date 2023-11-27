package ProjectsManagmentBackEnd.utils;

import ProjectsManagmentBackEnd.entity.User.Permission;
import ProjectsManagmentBackEnd.entity.User.Role;
import ProjectsManagmentBackEnd.entity.User.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class JwtUser implements UserDetails {


    private final String username;
    private final String email;

    private String firstName;

    private String lastName;
    private final String password;
    private final Boolean enabled;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private final java.sql.Timestamp lastPasswordResetDate;
   private final Role role;


    public JwtUser(User user) {
        username = user.getUsername();
        email = user.getEmail();
        firstName=user.getFirstName();
        lastName=user.getLastName();
        password = user.getPassword();
       role = user.getRole();
        enabled=user.getEnabled();
        lastPasswordResetDate=user.getLastPasswordResetDate();

    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

            var authorities =role.getPermissions()
                    .stream()
                    .map(permission ->new SimpleGrantedAuthority(permission.getPermission()))
                    .collect(Collectors.toList());
            return authorities;

    }

    @JsonIgnore
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }
    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
