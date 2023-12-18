package ProjectsManagmentBackEnd.controllers;

import ProjectsManagmentBackEnd.dtos.project.ProjectDTO;
import ProjectsManagmentBackEnd.dtos.project.ProjectShortDTO;
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
    public ResponseEntity<List<ProjectShortDTO>> getAll()  {
        return projectService.getAll();
    }
    @GetMapping("/my-projects")
    public ResponseEntity<List<ProjectDTO>> getUserProjects()  {
        return projectService.getAllByUser();
    }
    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectDTO> getProjectDetails(@PathVariable("projectId") String id) throws BusinessException {
        return projectService.getDetails(id);
    }


    @PutMapping("/addAdmin/{projectId}/{userId}")
    public ResponseEntity addAdmin(@PathVariable("projectId") String projectId, @PathVariable("userId") String userId) throws BusinessException {
        return projectService.addAdmin(projectId,userId);
    }
}
