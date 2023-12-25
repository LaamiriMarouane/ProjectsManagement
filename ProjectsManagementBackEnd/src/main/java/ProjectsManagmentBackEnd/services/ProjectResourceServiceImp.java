package ProjectsManagmentBackEnd.services;

import ProjectsManagmentBackEnd.dtos.resources.FileDTO;
import ProjectsManagmentBackEnd.dtos.resources.FolderDTO;
import ProjectsManagmentBackEnd.dtos.resources.ProjectResourceDTO;
import ProjectsManagmentBackEnd.entity.project.Project;
import ProjectsManagmentBackEnd.entity.project.ProjectResource;
import ProjectsManagmentBackEnd.entity.ressources.File;
import ProjectsManagmentBackEnd.entity.ressources.Folder;
import ProjectsManagmentBackEnd.mappers.ProjectResourceMapper;
import ProjectsManagmentBackEnd.repository.FileResourceRepository;
import ProjectsManagmentBackEnd.repository.FolderResourceRepository;
import ProjectsManagmentBackEnd.repository.ProjectRepository;
import ProjectsManagmentBackEnd.utils.FileSystem;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class ProjectResourceServiceImp {
    private final FolderResourceRepository folderResourceRepository;
    private final FileResourceRepository fileResourceRepository;
    private final ProjectRepository projectRepository;
    private final FileSystem fileSystem;

    public ProjectResourceServiceImp(
            FolderResourceRepository folderResourceRepository,
            FileResourceRepository fileResourceRepository,
            ProjectRepository projectRepository
    ) {
        this.folderResourceRepository = folderResourceRepository;
        this.fileResourceRepository = fileResourceRepository;
        this.projectRepository = projectRepository;
        this.fileSystem = new FileSystem();
    }

    public void createFolder(FolderDTO folderDTO, String parentFolderId) throws IOException {
        Folder folder = ProjectResourceMapper.toEntity(folderDTO);

        Folder parentFolder = folderResourceRepository.findById(parentFolderId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Parent Folder Not Existed"));

        folder.setParentFolder(parentFolder);
        folder.setPath( folder.getParentFolder().getPath()+ java.io.File.separator + folder.getName());
        folderResourceRepository.save(folder);

        fileSystem.saveResource(folder);
        parentFolder.getSubResources().add(folder);
        folderResourceRepository.save(parentFolder);
    }

    public void createFile(FileDTO fileDTO, String parentFolderId) throws IOException {
        ProjectsManagmentBackEnd.entity.ressources.File file = ProjectResourceMapper.toEntity(fileDTO);

        Folder parentFolder = folderResourceRepository.findById(parentFolderId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Parent Folder Not Existed"));

        file.setParentFolder( parentFolder );
        file.setPath( file.getParentFolder().getPath()+ java.io.File.separator + file.getName());
        fileResourceRepository.save(file);

        fileSystem.saveResource(file);
        parentFolder.getSubResources().add(file);
        folderResourceRepository.save(parentFolder);
    }

    public List<ProjectResourceDTO> getRootHierarchy(String projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow(()-> new RuntimeException("Project not existed"));
        Folder rootFolder = project.getRootFolder();
        return getHierarchyForFolder(rootFolder).getSubResources();
    }

    private FolderDTO getHierarchyForFolder(Folder folder) {
        FolderDTO folderDTO = ProjectResourceMapper.toDto(folder);
        List<ProjectResourceDTO> subResources = folder.getSubResources().stream()
                .map(subResource -> {
                    if (subResource instanceof Folder) {
                        return getHierarchyForFolder((Folder) subResource);
                    } else if (subResource instanceof File) {
                        return ProjectResourceMapper.toDto((File) subResource);
                    }
                    return null;
                })
                .collect(Collectors.toList());
        folderDTO.setSubResources(subResources);
        return folderDTO;
    }
}