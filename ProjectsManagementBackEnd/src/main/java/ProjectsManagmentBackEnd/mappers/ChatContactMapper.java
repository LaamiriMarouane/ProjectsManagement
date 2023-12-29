package ProjectsManagmentBackEnd.mappers;

import ProjectsManagmentBackEnd.dtos.chat.ChatContactDTO;
import ProjectsManagmentBackEnd.dtos.chat.ChatContactShortDTO;
import ProjectsManagmentBackEnd.dtos.chat.ChatMessageDTO;
import ProjectsManagmentBackEnd.entity.chat.ChatContact;
import ProjectsManagmentBackEnd.entity.chat.ChatMessage;
import ProjectsManagmentBackEnd.entity.user.User;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class ChatContactMapper {

    public static ChatContact convert(ChatContactDTO in , User sender , User receiver) {

        if (in != null) {
            final ChatContact out = new ChatContact();
            out.setId(in.getId());
            out.setReceiver(receiver);
            out.setSender(sender);
            out.setMessages(in.getMessages().stream().map(msg->ChatMessageMapper.convert(msg,sender,receiver)).collect(Collectors.toSet()));
            return out;
        }
        return null;
    }

    public static ChatContactDTO convert(ChatContact in) {

        if (in != null) {
            final ChatContactDTO out = new ChatContactDTO();
            out.setId(in.getId());
            out.setReceiver(UserMapper.convertShort(in.getReceiver()));
            out.setSender(UserMapper.convertShort(in.getSender()));
            out.setMessages(in.getMessages().stream().sorted(Comparator.comparing(ChatMessage::getTime)).map(ChatMessageMapper::convert).collect(Collectors.toList()));
            return out;
        }
        return null;
    }
    public static ChatContactShortDTO convertShort(ChatContact in) {

        if (in != null) {
            final ChatContactShortDTO out = new ChatContactShortDTO();
            out.setId(in.getId());
            out.setReceiver(UserMapper.convertShort(in.getReceiver()));
            out.setSender(UserMapper.convertShort(in.getSender()));
            if(in.getMessages()!=null && in.getMessages().size()!=0){
                List<ChatMessage> messageList = in.getMessages().stream().sorted(Comparator.comparing(ChatMessage::getTime)).collect(Collectors.toList());
            out.setLastMessage(ChatMessageMapper.convert(messageList.get(messageList.size()-1)));

            }
            return out;
        }
        return null;
    }
}
