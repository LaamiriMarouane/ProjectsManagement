package ProjectsManagmentBackEnd.controllers;

import ProjectsManagmentBackEnd.dtos.ProjectMemberShipInvitationDTO;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import ProjectsManagmentBackEnd.holders.ApiPaths;
import ProjectsManagmentBackEnd.services.ProjectMemberShipInvitationImp;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiPaths.V1+ApiPaths.INVITATIONS)
@AllArgsConstructor
public class ProjectMemberShipInvitationController {

    private ProjectMemberShipInvitationImp projectMemberShipInvitationImp;

    @GetMapping("/{projectId}")
    public ResponseEntity<List<ProjectMemberShipInvitationDTO>> getAllByProject(@PathVariable String projectId){
        return projectMemberShipInvitationImp.getAllSentByProject(projectId);

    }
    @GetMapping()
    public ResponseEntity<List<ProjectMemberShipInvitationDTO>> getReceived(){
        return projectMemberShipInvitationImp.getAllReceived();
    }
    @PostMapping("/{projectId}/{userId}")
    public ResponseEntity<ProjectMemberShipInvitationDTO> send(@PathVariable String userId,@PathVariable String projectId ){
        return projectMemberShipInvitationImp.sendInvitation(userId, projectId);
    }

    @PutMapping("/accept/{invitationId}")
    public ResponseEntity<ProjectMemberShipInvitationDTO> accept(@PathVariable String invitationId) throws BusinessException {
        return projectMemberShipInvitationImp.acceptInvitation(invitationId);
    }
    @PutMapping("/decline/{invitationId}")
    public ResponseEntity<ProjectMemberShipInvitationDTO> decline(@PathVariable String invitationId) throws BusinessException {
        return projectMemberShipInvitationImp.declineInvitation(invitationId);
    }

}
