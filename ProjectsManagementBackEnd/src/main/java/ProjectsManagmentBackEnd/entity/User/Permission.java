package ProjectsManagmentBackEnd.entity.User;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {
    APP_USER_READ("appUser:read"),
    APP_ADMIN_READ("appAdmin:read"),
    APP_ADMIN_UPDATE("appAdmin:update"),
    APP_ADMIN_CREATE("appAdmin:create"),
    APP_ADMIN_DELETE("appAdmin:delete"),
    PROJECT_ADMIN_READ("projectAdmin:read"),
    PROJECT_ADMIN_UPDATE("projectAdmin:update"),
    PROJECT_ADMIN_CREATE("projectAdmin:create"),
    PROJECT_ADMIN_DELETE("projectAdmin:delete"),
    PROJECT_MANAGER_READ("projectManager:read"),
    PROJECT_MANAGER_UPDATE("projectManager:update"),
    PROJECT_MANAGER_CREATE("projectManager:create"),
    PROJECT_MANAGER_DELETE("projectManager:delete"),
    GUEST_READ("projectUserAdmin:read")

    ;




    @Getter
    private final String permission;
}
