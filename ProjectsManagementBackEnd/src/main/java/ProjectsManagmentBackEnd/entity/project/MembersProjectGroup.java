package ProjectsManagmentBackEnd.entity.project;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class MembersProjectGroup  extends ProjectGroup{
    @OneToOne
    @JoinColumn(name = "project_id")

    private Project project;
}
