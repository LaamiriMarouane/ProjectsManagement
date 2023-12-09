package ProjectsManagmentBackEnd.entity.event;

import ProjectsManagmentBackEnd.entity.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class UserEvent extends Event{
    @ManyToOne
    private User user;
}
