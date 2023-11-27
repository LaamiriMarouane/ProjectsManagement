package ProjectsManagmentBackEnd.exceptions.errors;


import com.fasterxml.jackson.annotation.JsonInclude;

import java.io.Serializable;

public class ApiValidationErrorMessage implements Serializable {

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String object;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String field;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String rejectedValue;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String message;

    public ApiValidationErrorMessage(String message) {
        this.message = message;
    }

    public ApiValidationErrorMessage(String object, String message) {
        this.object = object;
        this.message = message;
    }

    public String getObject() {
        return object;
    }

    public void setObject(String object) {
        this.object = object;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public Object getRejectedValue() {
        return rejectedValue;
    }

    public void setRejectedValue(String rejectedValue) {
        this.rejectedValue = rejectedValue;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

