package ProjectsManagmentBackEnd.entity.user;

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
    PROJECT_MEMBER_READ("projectMember:read"),
    PROJECT_MEMBER_UPDATE("projectMember:update"),
    PROJECT_MEMBER_CREATE("projectMember:create"),
    PROJECT_MEMBER_DELETE("projectMember:delete"),
    GUEST_READ("projectUserAdmin:read")

    ;




    @Getter
    private final String permission;
}
