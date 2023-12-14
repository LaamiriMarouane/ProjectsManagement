package ProjectsManagmentBackEnd.mappers;

import ProjectsManagmentBackEnd.dtos.user.UserDTO;
import ProjectsManagmentBackEnd.dtos.user.UserShortDTO;
import ProjectsManagmentBackEnd.entity.user.User;

public class UserMapper {
    public static UserDTO convert(User in) {

        if (in != null) {
            final UserDTO out = new UserDTO();
            out.setId(in.getId());
            out.setEmail(in.getEmail());
            out.setUsername(in.getUsername());


            return out;
        }
        return null;
    }
    public static User convert(UserDTO in) {

        if (in != null) {
            final User out = new User();
            out.setId(in.getId());
            out.setEmail(in.getEmail());
            out.setUsername(in.getUsername());


            return out;
        }
        return null;
    }
    public static UserShortDTO convertShort(User in) {

        if (in != null) {
            final UserShortDTO out = new UserShortDTO();
            out.setId(in.getId());
            out.setEmail(in.getEmail());
            out.setUsername(in.getUsername());

            return out;
        }
        return null;
    }
}
