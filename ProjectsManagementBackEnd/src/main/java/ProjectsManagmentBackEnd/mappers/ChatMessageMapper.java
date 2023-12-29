package ProjectsManagmentBackEnd.mappers;

import ProjectsManagmentBackEnd.dtos.chat.ChatMessageDTO;
import ProjectsManagmentBackEnd.entity.chat.ChatMessage;
import ProjectsManagmentBackEnd.entity.user.User;

public class ChatMessageMapper {
    public static ChatMessage convert(ChatMessageDTO in , User sender , User receiver) {

        if (in != null) {
            final ChatMessage out = new ChatMessage();
            out.setId(in.getId());
            out.setStatus(in.getStatus());
            out.setTime(in.getTime());
            out.setContent(in.getContent());
            out.setReceiver(receiver);
            out.setSender(sender);
            return out;
        }
        return null;
    }

    public static ChatMessageDTO convert(ChatMessage in) {

        if (in != null) {
            final ChatMessageDTO out = new ChatMessageDTO();
            out.setId(in.getId());
            out.setStatus(in.getStatus());
            out.setTime(in.getTime());
            out.setContent(in.getContent());
            out.setReceiver(UserMapper.convertShort(in.getReceiver()));
            out.setSender(UserMapper.convertShort(in.getSender()));
            return out;
        }
        return null;
    }
}
