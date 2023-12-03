package ProjectsManagmentBackEnd.mappers;

import ProjectsManagmentBackEnd.dtos.DemandDTO;
import ProjectsManagmentBackEnd.entity.demand.Demand;

public class DemandMapper {
   public static DemandDTO convert(Demand in) {

        if (in != null) {
            final DemandDTO out = new DemandDTO();
            out.setId(in.getId());
            out.setDemandState(in.getDemandState());
            out.setUser(in.getUser());
            out.setDemandCreatingTime(in.getDemandCreatingTime());
            out.setDescription(in.getDescription());
            out.setProjectName(in.getProjectName());
            out.setValidationTime(in.getValidationTime());


            return out;
        }
        return null;
    }
    public static Demand  convert(DemandDTO in) {

        if (in != null) {
            final Demand out = new Demand();
            out.setId(in.getId());
            out.setDemandState(in.getDemandState());
            out.setUser(in.getUser());
            out.setDemandCreatingTime(in.getDemandCreatingTime());
            out.setDescription(in.getDescription());
            out.setProjectName(in.getProjectName());
            out.setValidationTime(in.getValidationTime());


            return out;
        }
        return null;
    }
}
