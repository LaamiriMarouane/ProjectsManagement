package ProjectsManagmentBackEnd.services;

import ProjectsManagmentBackEnd.exceptions.BusinessException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;




@Service
public class EmailSenderServiceImp   {

   private JavaMailSender mailSender;

   private ThymeleafServiceImp thymeleafServiceImp;

    public EmailSenderServiceImp(JavaMailSender mailSender, ThymeleafServiceImp thymeleafServiceImp) {
        this.mailSender = mailSender;
        this.thymeleafServiceImp = thymeleafServiceImp;
    }

    @Value("${spring.mail.username}")
    private String email;


    public void sendMail(String userEmail,String toUserName, String fromUserName,String projectName) throws BusinessException {
        try {

            final MimeMessage mimeMessage = mailSender.createMimeMessage();
            final MimeMessageHelper message = new MimeMessageHelper(mimeMessage,true, "UTF-8");

            Map variables=new HashMap();
            variables.put("toUserName",toUserName);
            variables.put("fromUserName",fromUserName);
            variables.put("projectName",projectName);
            final String htmlContent = thymeleafServiceImp.createContent("project-member-ship-invitation-email-template.html",variables );
            message.setFrom(email);
            message.setTo(userEmail);
            message.setSubject("Invitation to Collaborate on "+projectName);
            message.setText(htmlContent,true);
            mailSender.send(mimeMessage);
        }catch (MessagingException e){
           new BusinessException("failed to send email");
        }
    }



}












