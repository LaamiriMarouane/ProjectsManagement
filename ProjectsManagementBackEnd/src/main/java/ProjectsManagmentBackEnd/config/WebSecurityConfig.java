package ProjectsManagmentBackEnd.config;



import ProjectsManagmentBackEnd.holders.ApiPaths;
import ProjectsManagmentBackEnd.security.JwtAuthenticationTokenFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;



@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig {


     private final JwtAuthenticationTokenFilter authenticationFilter;
    private final AuthenticationProvider authenticationProvider;



    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {


        http.sessionManagement(sM->sM.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                 .csrf(crst ->crst.disable()).authorizeHttpRequests(
                authorize->authorize
                        .requestMatchers(ApiPaths.V1 + ApiPaths.AUTH).permitAll()
                        .requestMatchers(ApiPaths.V1 +ApiPaths.PASSWORD_RESET).permitAll()
                        .requestMatchers(ApiPaths.V1 + ApiPaths.REGISTER).permitAll()
                        .requestMatchers(ApiPaths.V1 + ApiPaths.FORGOT_PASSWORD).permitAll()
                        .anyRequest().permitAll())
                        //.anyRequest().authenticated())
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();

    }




}
