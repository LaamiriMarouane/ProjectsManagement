package ProjectsManagmentBackEnd.exceptions.errors;



import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Map;

/**
 * Message object class
 */
@Getter
@Setter
public class ErrorMessage implements Serializable {

    private static final long serialVersionUID = 1L;

    private String key = null;
    private Integer code = null;
    private Map parameters = null;
    private String param = null;
    private Serializable[] parameter = null;


    public ErrorMessage() {
        super();
    }


    public ErrorMessage(String key) {
        this.key = key;
    }

    public ErrorMessage(String key, Serializable... parameters) {
        this.key = key;
        this.parameter = parameters;

    }
    public ErrorMessage(String key, String param) {
        this.key = key;
        this.param = param;
    }
    public ErrorMessage(String key, Map parameters) {
        this.key = key;
        this.parameters= parameters;
    }

    public ErrorMessage(String key, Integer code) {
        this.key = key;
        this.code = code;
    }

    public ErrorMessage(String key, Integer code, Serializable... parameters) {
        this.key = key;
        this.code = code;
        this.parameter = parameters;
    }
    public ErrorMessage(String key, Integer code, Map parameters) {
        this.key = key;
        this.code = code;
        this.parameters = parameters;
    }




}
