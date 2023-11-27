package ProjectsManagmentBackEnd.exceptions.errors;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Map;

@ToString
@RequiredArgsConstructor
public class ApiErrorResponse implements Serializable {

    private Integer code;

    private String message;
    private Map messages;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private Date timestamp;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<ApiValidationErrorMessage> subErrors;

/*
    public ApiErrorResponse(Integer code, String message, List<ApiValidationErrorMessage> subErrors) {
        this.code = code;
        this.message = message;
        this.timestamp = new Date();
        this.subErrors = subErrors;
    }
    public ApiErrorResponse(Integer code, Map messages, List<ApiValidationErrorMessage> subErrors) {
        this.code = code;
        this.messages = messages;
        this.timestamp = new Date();
        this.subErrors = subErrors;
    }
*/
    public ApiErrorResponse(Integer code, String message) {
        this.code = code;
        this.message = message;
        this.timestamp = new Date();
    }
    public ApiErrorResponse(Integer code, Map messages) {
        this.code = code;
        this.messages = messages;
        this.timestamp = new Date();
    }




    public static class ApiErrorResponseBuilder {

        private Integer code;
        private String message;
        private Map messages;
        private List<ApiValidationErrorMessage> subErrors;
/*
        public ApiErrorResponseBuilder setCode(Integer code) {
            this.code = code;
            return this;
        }

        public ApiErrorResponseBuilder setMessage(String message) {
            this.message = message;
            return this;
        }
        public ApiErrorResponseBuilder setMessages(Map message) {
            this.messages = message;
            return this;
        }

        public ApiErrorResponseBuilder setSubErrors(List<ApiValidationErrorMessage> subErrors) {
            this.subErrors = subErrors;
            return this;
        }

        public ApiErrorResponse createApiErrorResponse() {
            return new ApiErrorResponse(code, message, subErrors);
        }
        public ApiErrorResponse createApiErrorResponses() {
            return new ApiErrorResponse(code, messages, subErrors);}
    */
    }


}
