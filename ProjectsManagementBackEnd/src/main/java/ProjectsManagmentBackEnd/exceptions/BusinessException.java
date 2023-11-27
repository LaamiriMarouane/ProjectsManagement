package ProjectsManagmentBackEnd.exceptions;





import ProjectsManagmentBackEnd.exceptions.errors.ErrorMessage;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


public class BusinessException extends Exception {

    private static final long serialVersionUID = 1L;

    private final ErrorMessage errorMessage;
    private final List<ErrorMessage> subErrors;

    public BusinessException() {
        super();
        errorMessage = new ErrorMessage();
        subErrors = new ArrayList<>();
    }

    public BusinessException(String key) {
        super(key);
        errorMessage = new ErrorMessage(key);
        subErrors = new ArrayList<>();
    }

    public BusinessException(String key, String... args) {
        super(key);
        errorMessage = new ErrorMessage(key, args);
        subErrors = new ArrayList<>();
    }
    public BusinessException(String key, Map args) {
        super(key);
        errorMessage = new ErrorMessage(key, args);
        subErrors = new ArrayList<>();
    }

    public BusinessException(String key, Integer code, Serializable... args) {
        super(key);
        errorMessage = new ErrorMessage(key, code, args);
        subErrors = new ArrayList<>();
    }
    public BusinessException(String key, Integer code, Map args) {
        super(key);
        errorMessage = new ErrorMessage(key, code, args);
        subErrors = new ArrayList<>();
    }

    public BusinessException(String key, Integer code, List<ErrorMessage> subErrors,
                             Serializable... args) {
        super(key);
        errorMessage = new ErrorMessage(key, code, args);
        this.subErrors = subErrors;
    }

    public ErrorMessage getErrorMessage() {
        return errorMessage;
    }

    public List<ErrorMessage> getSubErrors() {
        return subErrors;
    }
}
