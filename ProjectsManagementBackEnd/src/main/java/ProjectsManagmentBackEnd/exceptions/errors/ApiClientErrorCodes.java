package ProjectsManagmentBackEnd.exceptions.errors;


public enum ApiClientErrorCodes {

    MISSING_SERVLET_REQUEST_PARAMETER_EXCEPTION_ERROR_CODE(1, "request.missing.parameter"),
    ARGUMENT_EXCEPTION_ERROR_CODE(2, "request.illegal.parameter"),
    MISSING_REQUEST_BODY_ERROR_CODE(3, "request.missing.body"),

    PRICING_NOT_FOUND(10000, "pricing.plan.not.found"),
    VIDEO_NOT_FOUND(10001, "video.not.found"),
    DURATION_NOT_VALID(10002, "duration.not.valid"),


    TECHNICAL_ERROR(9, "request.technical.error");

    private Integer code;
    private String msgKey;

    ApiClientErrorCodes(Integer code, String msgKey) {
        this.code = code;
        this.msgKey = msgKey;
    }

    public Integer getCode() {
        return code;
    }

    public String getMsgKey() {
        return msgKey;
    }
}
