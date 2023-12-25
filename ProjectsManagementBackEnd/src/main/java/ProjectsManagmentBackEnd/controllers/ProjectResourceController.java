package ProjectsManagmentBackEnd.controllers;
import ProjectsManagmentBackEnd.dtos.resources.FileDTO;
import ProjectsManagmentBackEnd.dtos.resources.FolderDTO;
import ProjectsManagmentBackEnd.dtos.resources.ProjectResourceDTO;
import ProjectsManagmentBackEnd.holders.ApiPaths;
import ProjectsManagmentBackEnd.services.ProjectResourceServiceImp;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(ApiPaths.V1+ApiPaths.RESOURCES)
@AllArgsConstructor
public class ProjectResourceController {

    private final ProjectResourceServiceImp projectResourceService;

    @PostMapping("/folders")
    public void createFolder(@RequestBody FolderDTO folderDTO, @RequestParam String parentFolderId) throws IOException {
        projectResourceService.createFolder(folderDTO, parentFolderId);
    }

    @PostMapping("/files")
    public void createFile(@RequestBody FileDTO fileDTO, @RequestParam String parentFolderId) throws IOException {
        projectResourceService.createFile(fileDTO, parentFolderId);
    }

    @GetMapping("/all/{projectId}")
    public ResponseEntity<List<ProjectResourceDTO>> getAllHierarchy(@PathVariable("projectId") String projectId) {
        return ResponseEntity.ok().body(projectResourceService.getRootHierarchy(projectId));
    }
}
