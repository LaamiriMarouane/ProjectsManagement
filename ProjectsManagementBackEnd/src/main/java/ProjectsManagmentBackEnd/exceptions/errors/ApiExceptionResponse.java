package ProjectsManagmentBackEnd.exceptions.errors;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Setter
@Getter
public class ApiExceptionResponse {
    private Integer code;
    private Map message=new HashMap<>();
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private Date timestamp;


    public ApiExceptionResponse(Integer code, Map messages) {
        this.code = code;
      this.message.putAll(messages);
        this.timestamp=new Date();

    }

}

