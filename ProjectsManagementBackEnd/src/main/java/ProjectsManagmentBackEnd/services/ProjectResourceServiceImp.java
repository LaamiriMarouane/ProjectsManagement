package ProjectsManagmentBackEnd.services;

import ProjectsManagmentBackEnd.dtos.resources.FileDTO;
import ProjectsManagmentBackEnd.dtos.resources.FolderDTO;
import ProjectsManagmentBackEnd.dtos.resources.ProjectResourceDTO;
import ProjectsManagmentBackEnd.entity.project.Project;
import ProjectsManagmentBackEnd.entity.ressources.File;
import ProjectsManagmentBackEnd.entity.ressources.Folder;
import ProjectsManagmentBackEnd.entity.ressources.ResourceType;
import ProjectsManagmentBackEnd.exceptions.ResourceAlreadyExist;
import ProjectsManagmentBackEnd.holders.ApiPaths;
import ProjectsManagmentBackEnd.mappers.ProjectResourceMapper;
import ProjectsManagmentBackEnd.repository.FileResourceRepository;
import ProjectsManagmentBackEnd.repository.FolderResourceRepository;
import ProjectsManagmentBackEnd.repository.ProjectRepository;
import ProjectsManagmentBackEnd.utils.FileSystem;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProjectResourceServiceImp {
    private final FolderResourceRepository folderResourceRepository;
    private final FileResourceRepository fileResourceRepository;
    private final ProjectRepository projectRepository;
    private final FileSystem fileSystem;

    public void createRootFolderByProjectName( Project currentProject ) {
        System.out.println("\n\tcurrent project id : { "+ currentProject.getId() +" }\n");
        Folder rootFolder = new Folder();
        rootFolder.setName( currentProject.getLongName() );
        rootFolder.setProject( currentProject );
        rootFolder.setType( ResourceType.FOLDER );
        rootFolder.setPath( ApiPaths.LOCAL_STORAGE + java.io.File.separator + rootFolder.getName());
        folderResourceRepository.save( rootFolder );
        currentProject.setRootFolder(rootFolder);
        projectRepository.save(currentProject);

        Folder src = new Folder();
        src.setName( "src" );
        src.setParentFolder( rootFolder );
        src.setType( ResourceType.FOLDER );
        src.setPath( rootFolder.getPath() + java.io.File.separator + "src" );
        folderResourceRepository.save( src );

        Folder web = new Folder();
        web.setName( "web" );
        web.setParentFolder( rootFolder );
        web.setType( ResourceType.FOLDER );
        web.setPath( rootFolder.getPath() + java.io.File.separator + "web" );
        folderResourceRepository.save( web );

        rootFolder.getSubResources().add(src);
        rootFolder.getSubResources().add(web);
        folderResourceRepository.save( rootFolder );
        try {
            this.fileSystem.saveFolder( rootFolder );
            this.fileSystem.saveFolder( src );
            this.fileSystem.saveFolder( web );
        } catch ( IOException e ) {
            e.printStackTrace();
        }
    }

    public FolderDTO createFolder(FolderDTO folderDTO, String parentFolderId) throws IOException {
        folderDTO.setType( ResourceType.FOLDER );
        Folder folder = ProjectResourceMapper.toEntity(folderDTO);

        Folder parentFolder = folderResourceRepository.findById(parentFolderId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Parent Folder Not Existed"));
        parentFolder.getSubResources().forEach(
                resource -> {
                    if( resource instanceof Folder && resource.getName().equals(folder.getName()) ) {
                        throw new ResourceAlreadyExist("This Folder "+folder.getName()+" already exist");
                    }
                }
        );

        folder.setParentFolder(parentFolder);
        folder.setPath( folder.getParentFolder().getPath()+ java.io.File.separator + folder.getName());
        folderResourceRepository.save(folder);

        fileSystem.saveFolder(folder);
        parentFolder.getSubResources().add(folder);
        folderResourceRepository.save(parentFolder);
        return ProjectResourceMapper.toDto(folder);
    }

    public FileDTO createFile(String parentFolderId , MultipartFile uploadedFile) throws IOException {
        File file = new File();
        file.setName(uploadedFile.getOriginalFilename() );
        file.setFileExtension( getFileExtension(uploadedFile.getOriginalFilename()));

        Folder parentFolder = folderResourceRepository.findById(parentFolderId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Parent Folder Not Existed"));
        parentFolder.getSubResources().forEach(
                resource -> {
                    if( resource instanceof File && resource.getName().equals(file.getName()) ) {
                        throw new ResourceAlreadyExist("This File "+file.getName()+" already exist");
                    }
                }
        );

        file.setParentFolder( parentFolder );
        file.setType( ResourceType.FILE );
        file.setPath( file.getParentFolder().getPath()+ java.io.File.separator + file.getName());
        fileResourceRepository.save(file);

        fileSystem.saveFile(file , uploadedFile.getBytes());
        parentFolder.getSubResources().add(file);
        folderResourceRepository.save(parentFolder);
        return ProjectResourceMapper.toDto(file);
    }

    public byte[] getFileContent( String fileId ) throws IOException {
        File file = fileResourceRepository
                .findById( fileId )
                .orElseThrow(()-> new RuntimeException("File not found"));
        return fileSystem.getFileContent( file );
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

    private String getFileExtension(String fileName) {
        if (fileName.lastIndexOf(".") != -1 && fileName.lastIndexOf(".") != 0) {
            return fileName.substring(fileName.lastIndexOf(".") + 1);
        } else {
            return ""; // pas d'extension
        }
    }
}