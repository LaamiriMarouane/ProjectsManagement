package ProjectsManagmentBackEnd.entity.event;

import ProjectsManagmentBackEnd.entity.project.Project;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ProjectEvent extends Event {
    @ManyToOne
    private Project project;
}
