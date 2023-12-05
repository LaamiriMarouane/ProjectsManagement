package ProjectsManagmentBackEnd.controllers;

import ProjectsManagmentBackEnd.dtos.ProjectDTO;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import ProjectsManagmentBackEnd.holders.ApiPaths;
import ProjectsManagmentBackEnd.services.ProjectServiceImp;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiPaths.V1+ApiPaths.PROJECTS)
@AllArgsConstructor
public class ProjectController {

    ProjectServiceImp projectService;
    @GetMapping()
    public ResponseEntity<List<ProjectDTO>> getAll()  {
        return projectService.getAll();
    }
    @PutMapping("/addMember/{projectId}/{userId}")
    public ResponseEntity addMember(@PathVariable("projectId") String projectId, @PathVariable("userId") String userId) throws BusinessException {
        return projectService.addMember(projectId,userId);
    }
    @PutMapping("/addAdmin/{projectId}/{userId}")
    public ResponseEntity getAdmin(@PathVariable("projectId") String projectId, @PathVariable("userId") String userId) throws BusinessException {
        return projectService.addAdmin(projectId,userId);
    }
}
