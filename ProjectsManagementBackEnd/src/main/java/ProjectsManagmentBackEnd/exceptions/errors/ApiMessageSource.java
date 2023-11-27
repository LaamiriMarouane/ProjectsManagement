package ProjectsManagmentBackEnd.exceptions.errors;


import lombok.AllArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;

import java.util.Locale;

@Component
@AllArgsConstructor
public class ApiMessageSource {


    private MessageSource source;

    public String getMessage(String code, Object... args) {
        Locale locale = LocaleContextHolder.getLocale();
        return source.getMessage(code, args, "!" + code + "!", locale);
    }

    public String getMessage(Locale locale, String code, Object... args) {
        return source.getMessage(code, args, "!" + code + "!", locale);
    }
}