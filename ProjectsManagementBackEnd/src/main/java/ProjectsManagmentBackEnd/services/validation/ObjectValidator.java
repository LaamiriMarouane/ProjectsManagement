package ProjectsManagmentBackEnd.services.validation;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import lombok.AllArgsConstructor;
import org.hibernate.validator.internal.engine.path.PathImpl;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class ObjectValidator<T> {
    private ValidatorFactory factory= Validation.buildDefaultValidatorFactory();
    private Validator validator= factory.getValidator();

    public Map<?,?> validate(T ObjectToValidator){
        Set<ConstraintViolation<T>> validation= validator.validate(ObjectToValidator);

        if(!validation.isEmpty()){
            return validation.stream().collect(Collectors.toMap(c->((PathImpl)c.getPropertyPath()).getLeafNode().getName(), c->c.getMessage()));
        }
        return Collections.emptyMap();

    }
}
