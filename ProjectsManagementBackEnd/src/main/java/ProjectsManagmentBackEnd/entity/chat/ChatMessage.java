package ProjectsManagmentBackEnd.entity.chat;

import ProjectsManagmentBackEnd.entity.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.util.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ChatMessage {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private String id;
    @ManyToOne
    private User sender;
    @ManyToOne
    private User receiver;
    private Date time ;
    private String content ;
    private MessageStatus status;
    @ManyToMany
    private Set<ChatContact> contacts=new LinkedHashSet<>();;
}
