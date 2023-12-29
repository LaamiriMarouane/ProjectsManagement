package ProjectsManagmentBackEnd.dtos.chat;

import ProjectsManagmentBackEnd.dtos.user.UserShortDTO;
import ProjectsManagmentBackEnd.entity.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ChatContactDTO {

    private String id;
    private UserShortDTO sender;
    private UserShortDTO receiver;
    private List<ChatMessageDTO> messages;
}
