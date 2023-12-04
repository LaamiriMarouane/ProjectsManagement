package ProjectsManagmentBackEnd.mappers;

import ProjectsManagmentBackEnd.dtos.DemandDTO;
import ProjectsManagmentBackEnd.dtos.ProjectDTO;
import ProjectsManagmentBackEnd.entity.Project;
import ProjectsManagmentBackEnd.entity.demand.Demand;

public class ProjectMapper {
    public static ProjectDTO convert(Project in) {

        if (in != null) {
            final ProjectDTO out = new ProjectDTO();
            out.setId(in.getId());



            return out;
        }
        return null;
    }
    public static Project  convert(ProjectDTO in) {

        if (in != null) {
            final Project out = new Project();
            out.setId(in.getId());



            return out;
        }
        return null;
    }
}
