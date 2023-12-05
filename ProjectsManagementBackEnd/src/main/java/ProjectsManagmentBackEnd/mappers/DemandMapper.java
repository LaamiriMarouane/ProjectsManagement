package ProjectsManagmentBackEnd.mappers;

import ProjectsManagmentBackEnd.dtos.DemandDTO;
import ProjectsManagmentBackEnd.entity.project.Project;
import ProjectsManagmentBackEnd.entity.demand.Demand;
import ProjectsManagmentBackEnd.entity.user.User;

public class DemandMapper {
   public static DemandDTO convert(Demand in) {

        if (in != null) {
            final DemandDTO out = new DemandDTO();
            out.setId(in.getId());
            out.setDemandState(in.getDemandState());
            out.setUser(UserMapper.convertShort((in.getUser())));
            out.setType(in.getType());
            out.setTheme(in.getTheme());
            out.setDemandCreatingTime(in.getDemandCreatingTime());
            out.setDescription(in.getDescription());
            out.setProjectName(in.getProjectName());
            out.setProjectLongName(in.getProjectLongName());
            out.setValidationTime(in.getValidationTime());
            out.setPublic(in.isPublic());


            return out;
        }
        return null;
    }
    public static Demand  convert(DemandDTO in, User user) {

        if (in != null) {
            final Demand out = new Demand();
            out.setId(in.getId());
            out.setDemandState(in.getDemandState());
            out.setUser(user);
            out.setType(in.getType());
            out.setTheme(in.getTheme());
            out.setDemandCreatingTime(in.getDemandCreatingTime());
            out.setDescription(in.getDescription());
            out.setProjectName(in.getProjectName());
            out.setValidationTime(in.getValidationTime());
            out.setPublic(in.isPublic());
            out.setProjectLongName(in.getProjectLongName());

            return out;
        }
        return null;
    }
    public static Project convertToProject(DemandDTO in) {

        if (in != null) {
            final Project out = new Project();
            out.setShortName(in.getProjectName());
            out.setLongName(in.getProjectLongName());
            out.setType(in.getType());
            out.setTheme(in.getTheme());
            out.setDescription(in.getDescription());
            out.setPublic(in.isPublic());
            out.setActive(true);



            return out;
        }
        return null;
    }
}
