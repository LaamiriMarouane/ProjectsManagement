package ProjectsManagmentBackEnd.controllers;
import ProjectsManagmentBackEnd.dtos.resources.FileDTO;
import ProjectsManagmentBackEnd.dtos.resources.FolderDTO;
import ProjectsManagmentBackEnd.dtos.resources.ProjectResourceDTO;
import ProjectsManagmentBackEnd.holders.ApiPaths;
import ProjectsManagmentBackEnd.services.ProjectResourceServiceImp;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(ApiPaths.V1+ApiPaths.RESOURCES)
@AllArgsConstructor
public class ProjectResourceController {

    private final ProjectResourceServiceImp projectResourceService;

    @PostMapping("/newFolder/{parentId}")
    public ResponseEntity<FolderDTO> createFolder(@RequestBody FolderDTO folderDTO, @PathVariable("parentId") String parentFolderId) throws IOException {
        return ResponseEntity.ok().body(projectResourceService.createFolder(folderDTO, parentFolderId));
    }

    @PostMapping("/newFile/{parentId}")
    public ResponseEntity<FileDTO> createFile(@PathVariable("parentId") String parentFolderId , @RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok().body(projectResourceService.createFile(parentFolderId , file));
    }

    @GetMapping("/file/{fileId}/content")
    public ResponseEntity<byte[]> getFileContent(@PathVariable String fileId) throws IOException {
        byte[] fileContent = projectResourceService.getFileContent( fileId );
        return ResponseEntity.ok().body(fileContent);
    }

    @GetMapping("/all/{projectId}")
    public ResponseEntity<List<ProjectResourceDTO>> getAllHierarchy(@PathVariable("projectId") String projectId) {
        return ResponseEntity.ok().body(projectResourceService.getRootHierarchy(projectId));
    }
}
