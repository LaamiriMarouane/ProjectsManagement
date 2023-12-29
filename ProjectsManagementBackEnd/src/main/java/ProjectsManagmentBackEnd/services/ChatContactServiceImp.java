package ProjectsManagmentBackEnd.services;

import ProjectsManagmentBackEnd.dtos.chat.ChatContactDTO;
import ProjectsManagmentBackEnd.dtos.chat.ChatContactShortDTO;
import ProjectsManagmentBackEnd.dtos.user.UserShortDTO;
import ProjectsManagmentBackEnd.entity.chat.ChatContact;
import ProjectsManagmentBackEnd.entity.user.User;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import ProjectsManagmentBackEnd.mappers.ChatContactMapper;
import ProjectsManagmentBackEnd.repository.ChatContactRepository;
import ProjectsManagmentBackEnd.repository.UserRepository;
import ProjectsManagmentBackEnd.utils.UserContext;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ChatContactServiceImp {
    private final UserRepository userRepository;
    private final ChatContactRepository chatContactRepository;


    public ChatContactShortDTO  addContact(String receiverId) throws BusinessException {
        User sander= UserContext.currentUser();
        Optional<User> receiver=userRepository.findById(receiverId);
        if(receiver.isPresent()){
            ChatContact chatContact = ChatContact.builder()
                            .sender(sander)
                    .receiver(receiver.get()).build();
            ChatContact chatContact2 = ChatContact.builder()
                            .sender(receiver.get())
                    .receiver(sander).build();
            chatContactRepository.save(chatContact2);
         return  ChatContactMapper.convertShort(chatContactRepository.save(chatContact));
        }else{
            Map errorMap=new HashMap<>();
            errorMap.put("error adding the Chat Contact ","user  not found.");
           throw  new BusinessException("error",errorMap) ;
        }

    }
    public List<ChatContactShortDTO> getAllContacts(){
        User sander= UserContext.currentUser();
        List< ChatContact >chatContacts = chatContactRepository.findAllBySender(sander);
            return chatContacts.stream().map(ChatContactMapper::convertShort).collect(Collectors.toList());
    }
    public ChatContactDTO getContactDetails(String receiverId) throws BusinessException {
        User sander= UserContext.currentUser();
            ChatContact chatContact = getChatContactBySenderAndReceiver(sander.getId(), receiverId);
        return ChatContactMapper.convert(chatContact);
    }



    public ChatContact getChatContactBySenderAndReceiver(String sanderId,String receiverId) throws BusinessException {
        User sander=userRepository.findById(sanderId).get();
        User receiver=userRepository.findById(receiverId).get();
            Map errorMap=new HashMap<>();
            errorMap.put("error getting the Chat Contact ","Chat Contact not found.");
        return     chatContactRepository.findBySenderAndReceiver(sander,receiver).orElseThrow(()-> new BusinessException("error",errorMap));

    }
}
