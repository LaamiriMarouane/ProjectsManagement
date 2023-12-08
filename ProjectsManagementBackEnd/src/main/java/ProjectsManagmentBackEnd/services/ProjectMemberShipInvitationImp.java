package ProjectsManagmentBackEnd.services;

import ProjectsManagmentBackEnd.dtos.DemandDTO;
import ProjectsManagmentBackEnd.dtos.ProjectMemberShipInvitationDTO;
import ProjectsManagmentBackEnd.entity.ProjectMemberShipInvitation.ProjectMemberShipInvitation;
import ProjectsManagmentBackEnd.entity.ProjectMemberShipInvitation.ProjectMemberShipInvitationState;
import ProjectsManagmentBackEnd.entity.project.Project;
import ProjectsManagmentBackEnd.entity.user.User;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import ProjectsManagmentBackEnd.mappers.ProjectMemberShipInvitationMapper;
import ProjectsManagmentBackEnd.repository.ProjectMemberShipInvitationRepository;
import ProjectsManagmentBackEnd.repository.ProjectRepository;
import ProjectsManagmentBackEnd.repository.UserRepository;
import ProjectsManagmentBackEnd.utils.UserContext;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProjectMemberShipInvitationImp {
    private ProjectMemberShipInvitationRepository projectMemberShipInvitationRepository;
    private ProjectRepository projectRepository;
    private UserRepository userRepository;
    private ProjectServiceImp projectServiceImp;
    public ResponseEntity<List<ProjectMemberShipInvitationDTO>> getAllSentByProject(String projectId){
        User user= UserContext.currentUser();
        Project project=projectRepository.findById(projectId).get();
        List<ProjectMemberShipInvitationDTO> projectMemberShipInvitationDTOList=
                projectMemberShipInvitationRepository
                        .findAllByFromAndProject(user,project)
                        .stream()
                        .map(ProjectMemberShipInvitationMapper::convert).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(projectMemberShipInvitationDTOList);
    }
    public ResponseEntity<List<ProjectMemberShipInvitationDTO>> getAllReceived(){
        User user= UserContext.currentUser();
        List<ProjectMemberShipInvitationDTO> projectMemberShipInvitationDTOList=
                projectMemberShipInvitationRepository
                        .findAllByTo(user)
                        .stream()
                        .map(ProjectMemberShipInvitationMapper::convert).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(projectMemberShipInvitationDTOList);
    }
    public ResponseEntity<ProjectMemberShipInvitationDTO> acceptInvitation(String InvitationId) throws BusinessException {
        User user= UserContext.currentUser();
        Optional<ProjectMemberShipInvitation> projectMemberShipInvitation=
                projectMemberShipInvitationRepository.findByIdAndTo(InvitationId,user);
        if(projectMemberShipInvitation.isPresent()){
            ProjectMemberShipInvitation invitation=projectMemberShipInvitation.get();
            invitation.setState(ProjectMemberShipInvitationState.ACCEPTED);
            projectServiceImp.addMember(invitation.getProject().getId(), user.getId());
            projectMemberShipInvitationRepository.save(invitation);
            return ResponseEntity.status(HttpStatus.OK).body(ProjectMemberShipInvitationMapper.convert(invitation));

        }else{

            throw new BusinessException("projectMemberShipInvitation does not exist ");
        }
    }
    public ResponseEntity<ProjectMemberShipInvitationDTO> declineInvitation(String InvitationId) throws BusinessException {
        User user= UserContext.currentUser();
        Optional<ProjectMemberShipInvitation> projectMemberShipInvitation=
                projectMemberShipInvitationRepository.findByIdAndTo(InvitationId,user);
        if(projectMemberShipInvitation.isPresent()){
            ProjectMemberShipInvitation invitation=projectMemberShipInvitation.get();
            invitation.setState(ProjectMemberShipInvitationState.REJECTED);
            projectMemberShipInvitationRepository.save(invitation);
            return ResponseEntity.status(HttpStatus.OK).body(ProjectMemberShipInvitationMapper.convert(projectMemberShipInvitation.get()));

        }else{

            throw new BusinessException("projectMemberShipInvitation does not exist ");
        }


    }
    public ResponseEntity<ProjectMemberShipInvitationDTO> sendInvitation(ProjectMemberShipInvitationDTO projectMemberShipInvitationDTO){
        User fromUser= UserContext.currentUser();
        User toUser= userRepository.findById(projectMemberShipInvitationDTO.getTo().getId()).get();
        Project project=projectRepository.findById(projectMemberShipInvitationDTO.getProject().getId()).get();
        ProjectMemberShipInvitation invitation=new ProjectMemberShipInvitation();
        invitation.setTo(toUser);
        invitation.setFrom(fromUser);
        invitation.setProject(project);
        invitation.setState(ProjectMemberShipInvitationState.NEW);
        invitation.setCreationTime(new Date());
        invitation= projectMemberShipInvitationRepository.save(invitation);
        ProjectMemberShipInvitationDTO invitationDTO=ProjectMemberShipInvitationMapper.convert(invitation);
        //send email maybe

        return ResponseEntity.status(HttpStatus.OK).body(invitationDTO);
    }

}
