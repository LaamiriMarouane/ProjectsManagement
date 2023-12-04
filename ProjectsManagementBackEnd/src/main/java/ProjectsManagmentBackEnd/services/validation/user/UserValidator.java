package ProjectsManagmentBackEnd.services.validation.user;

import ProjectsManagmentBackEnd.dtos.user.UserDTO;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import ProjectsManagmentBackEnd.repository.UserRepository;
import ProjectsManagmentBackEnd.services.validation.ObjectValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
@AllArgsConstructor
public class UserValidator {
    private ObjectValidator<UserDTO> validator;
    private UserRepository userRepository;

    public void userValide(UserDTO userInfo) throws BusinessException {
        Map isValidErrors=new HashMap<>();
        isValidErrors.putAll(validator.validate(userInfo));


        if (userInfo.getPassword()!=null && userInfo.getConfirmationPassword()!=null && !userInfo.getPassword().equals(userInfo.getConfirmationPassword())){

            isValidErrors.put("passwordConf","passwords do not match");
        }
        if(userRepository.existsUserByUsernameOrEmail(userInfo.getUserName(),userInfo.getEmail())){
            isValidErrors=new HashMap<>();
            isValidErrors.put("exist","user account exist" );
        }
        if(!isValidErrors.isEmpty()){

            throw  new BusinessException("validation error",1111, isValidErrors);
        }
    }
}
