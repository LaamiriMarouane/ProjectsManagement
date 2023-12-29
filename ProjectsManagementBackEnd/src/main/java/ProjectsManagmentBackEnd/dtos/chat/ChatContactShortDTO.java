package ProjectsManagmentBackEnd.dtos.chat;

import ProjectsManagmentBackEnd.dtos.user.UserShortDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ChatContactShortDTO {
    private String id;
    private UserShortDTO receiver;
    private UserShortDTO sender;
    private ChatMessageDTO lastMessage;
}
