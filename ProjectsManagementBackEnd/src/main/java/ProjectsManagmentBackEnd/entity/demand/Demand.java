package ProjectsManagmentBackEnd.entity.demand;

import ProjectsManagmentBackEnd.entity.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.sql.Timestamp;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Demand {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private String id;

    private String projectName;

    private String description;

    private boolean isPublic;

    @ManyToOne
    private User user;

    private DemandState demandState;

    private  Timestamp validationTime;

    private Timestamp demandCreatingTime;

}

