    package ProjectsManagmentBackEnd.entity.demand;

    import ProjectsManagmentBackEnd.entity.user.User;
    import com.fasterxml.jackson.annotation.JsonFormat;
    import jakarta.persistence.*;
    import lombok.Data;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;
    import org.hibernate.annotations.GenericGenerator;

    import java.text.SimpleDateFormat;
    import java.time.LocalDateTime;
    import java.util.Date;

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

        private String projectLongName;

        private String description;

        private String type;

        private String theme;

        private boolean isPublic;

        @ManyToOne
        private User user;

        private DemandState demandState;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        private Date validationTime;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        private Date demandCreatingTime;
        @PrePersist
        public void prePersist() {
            this.demandCreatingTime =new Date();
        }

    }

