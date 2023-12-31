package ProjectsManagmentBackEnd.exceptions.handler;



import ProjectsManagmentBackEnd.exceptions.BusinessException;
import ProjectsManagmentBackEnd.exceptions.ResourceAlreadyExist;
import ProjectsManagmentBackEnd.exceptions.errors.ApiClientErrorCodes;
import ProjectsManagmentBackEnd.exceptions.errors.ApiErrorResponse;
import ProjectsManagmentBackEnd.exceptions.errors.ApiExceptionResponse;
import ProjectsManagmentBackEnd.exceptions.errors.ApiMessageSource;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.naming.AuthenticationException;
import java.nio.file.AccessDeniedException;


@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
@AllArgsConstructor
public class RestExceptionHandler  {

    private final ApiMessageSource apiMessageSource;



    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ApiExceptionResponse> apiBusinessException(BusinessException businessException) {

        ApiExceptionResponse apiExceptionResponse =new ApiExceptionResponse(businessException.getErrorMessage().getCode(),
                businessException.getErrorMessage().getParameters());


        return ResponseEntity.badRequest().body(apiExceptionResponse);
    }



    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ApiErrorResponse> handleMissingServletRequestParameterException(
            MissingServletRequestParameterException e) {
        return ResponseEntity.badRequest().body(
                new ApiErrorResponse(
                        ApiClientErrorCodes.MISSING_SERVLET_REQUEST_PARAMETER_EXCEPTION_ERROR_CODE.getCode(),
                        apiMessageSource
                                .getMessage(ApiClientErrorCodes.MISSING_SERVLET_REQUEST_PARAMETER_EXCEPTION_ERROR_CODE.getMsgKey())));
    }

    @ExceptionHandler(value = IllegalArgumentException.class)
    public ResponseEntity<ApiErrorResponse> handleIllegalArgumentExceptionException(
            IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(
                new ApiErrorResponse(
                        ApiClientErrorCodes.ARGUMENT_EXCEPTION_ERROR_CODE.getCode(),
                        apiMessageSource.getMessage(ApiClientErrorCodes.ARGUMENT_EXCEPTION_ERROR_CODE.getMsgKey())));
    }
    @ExceptionHandler(value = AccessDeniedException.class)
    public ResponseEntity<ApiErrorResponse> h (
            AccessDeniedException e) {
        return ResponseEntity.badRequest().body(
                new ApiErrorResponse(
                      1554,
                        "access denied"));
    }

    @ExceptionHandler(value = HttpMessageNotReadableException.class)
    public ResponseEntity<ApiErrorResponse> handleHttpMessageNotReadableException(
            HttpMessageNotReadableException e) {
        return ResponseEntity.badRequest().body(
                new ApiErrorResponse(
                        ApiClientErrorCodes.MISSING_REQUEST_BODY_ERROR_CODE.getCode(),
                        apiMessageSource.getMessage(ApiClientErrorCodes.MISSING_REQUEST_BODY_ERROR_CODE.getMsgKey())));
    }

    @ExceptionHandler({AuthenticationException.class, UsernameNotFoundException.class})
    public ResponseEntity<String> handleAuthenticationException(AuthenticationException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    @ExceptionHandler(value = ResourceAlreadyExist.class)
    public ResponseEntity<Object> handleFolderAlreadyExistException(ResourceAlreadyExist ex) {
        return new ResponseEntity<>(ex.getMessage() , HttpStatus.BAD_REQUEST);
    }


}
