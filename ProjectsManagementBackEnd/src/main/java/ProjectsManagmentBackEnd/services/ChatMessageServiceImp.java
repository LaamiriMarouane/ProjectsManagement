package ProjectsManagmentBackEnd.services;

import ProjectsManagmentBackEnd.dtos.chat.ChatMessageDTO;
import ProjectsManagmentBackEnd.entity.chat.ChatContact;
import ProjectsManagmentBackEnd.entity.chat.ChatMessage;
import ProjectsManagmentBackEnd.entity.chat.MessageStatus;
import ProjectsManagmentBackEnd.entity.user.User;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import ProjectsManagmentBackEnd.mappers.ChatMessageMapper;
import ProjectsManagmentBackEnd.repository.ChatContactRepository;
import ProjectsManagmentBackEnd.repository.ChatMessageRepository;
import ProjectsManagmentBackEnd.repository.UserRepository;
import ProjectsManagmentBackEnd.utils.UserContext;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@AllArgsConstructor
@Service
public class ChatMessageServiceImp {

    private final UserRepository userRepository;
    private final ChatContactRepository chatContactRepository;
    private final ChatContactServiceImp chatContactServiceImp;
    public ChatMessage addMessageToContact( ChatMessageDTO chatMessageDTO) throws BusinessException {
        User sander=userRepository.findById(chatMessageDTO.getSender().getId()).get();
        Optional<User> receiver=userRepository.findById(chatMessageDTO.getReceiver().getId());
        if(receiver.isPresent()){
            chatMessageDTO.setTime(new Date());
            ChatMessage  chatMessage= ChatMessageMapper.convert(chatMessageDTO,sander,receiver.get());
           chatMessage.setStatus(MessageStatus.UNSEEN);
           chatMessage.setSender(sander);

            ChatContact receiverChatContact=chatContactServiceImp.getChatContactBySenderAndReceiver(chatMessageDTO.getReceiver().getId(), sander.getId());
            ChatContact sanderChatContact=chatContactServiceImp.getChatContactBySenderAndReceiver( sander.getId(),chatMessageDTO.getReceiver().getId());


           receiverChatContact.getMessages().add(chatMessage);
            chatMessage.getContacts().add(receiverChatContact);

           sanderChatContact.getMessages().add(chatMessage);
            chatMessage.getContacts().add(sanderChatContact);


           chatContactRepository.save(receiverChatContact);
           chatContactRepository.save(sanderChatContact);
            return chatMessage;

        }else{
            Map errorMap=new HashMap<>();
            errorMap.put("error getting the user ","user not found.");
          throw   new BusinessException("error",errorMap);

        }

    }
}
