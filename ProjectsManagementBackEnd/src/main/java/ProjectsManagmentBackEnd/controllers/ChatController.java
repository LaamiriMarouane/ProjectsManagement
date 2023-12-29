package ProjectsManagmentBackEnd.controllers;

import ProjectsManagmentBackEnd.dtos.chat.ChatContactDTO;
import ProjectsManagmentBackEnd.dtos.chat.ChatContactShortDTO;
import ProjectsManagmentBackEnd.dtos.chat.ChatMessageDTO;
import ProjectsManagmentBackEnd.entity.chat.ChatMessage;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import ProjectsManagmentBackEnd.holders.ApiPaths;
import ProjectsManagmentBackEnd.mappers.ChatMessageMapper;
import ProjectsManagmentBackEnd.services.ChatContactServiceImp;
import ProjectsManagmentBackEnd.services.ChatMessageServiceImp;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@AllArgsConstructor
@Controller
@RequestMapping(ApiPaths.V1)
public class ChatController {
    private final SimpMessagingTemplate messagingTemplate;
    private final ChatMessageServiceImp chatMessageService;
    private  final ChatContactServiceImp chatContactService;

    @MessageMapping(ApiPaths.CHAT)
    @SendTo("/user/private")
    public void processMessage(@Payload ChatMessageDTO chatMessage) throws BusinessException {
        ChatMessage savedMsg = chatMessageService.addMessageToContact(chatMessage);
        messagingTemplate.convertAndSendToUser(
                chatMessage.getReceiver().getUsername(), "/private", ChatMessageMapper.convert(savedMsg)
        );
    }

    @GetMapping(ApiPaths.CHAT+"/contacts/{receiverId}")
    public ResponseEntity<ChatContactDTO> getChatDetails(@PathVariable String receiverId) throws BusinessException {
        return ResponseEntity
                .ok(chatContactService.getContactDetails(receiverId));
    }
    @GetMapping(ApiPaths.CHAT+"/contacts")
    public ResponseEntity<List<ChatContactShortDTO>> getChatContacts()  {
        return ResponseEntity
                .ok(chatContactService.getAllContacts());
    }
    @PostMapping(ApiPaths.CHAT+"/contacts/{receiverId}")
    public ResponseEntity<ChatContactShortDTO> addChatContact(@PathVariable String receiverId) throws BusinessException {
        return ResponseEntity
                .ok(chatContactService.addContact(receiverId));
    }
}
