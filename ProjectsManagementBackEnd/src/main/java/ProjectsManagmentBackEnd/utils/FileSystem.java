package ProjectsManagmentBackEnd.utils;

import ProjectsManagmentBackEnd.entity.project.ProjectResource;
import ProjectsManagmentBackEnd.entity.ressources.Folder;
import lombok.NoArgsConstructor;


import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@NoArgsConstructor
public class FileSystem {
    public void saveResource(ProjectResource resource) throws IOException {
        if (resource instanceof Folder) {
            saveFolder((Folder) resource);
        } else if (resource instanceof ProjectsManagmentBackEnd.entity.ressources.File) {
            saveFile((ProjectsManagmentBackEnd.entity.ressources.File) resource);
        }
    }

    public void renameResource(ProjectResource resource, String newName) throws IOException {
        if (resource instanceof Folder) {
            renameFolder((Folder) resource, newName);
        } else if (resource instanceof ProjectsManagmentBackEnd.entity.ressources.File) {
            renameFile((ProjectsManagmentBackEnd.entity.ressources.File) resource, newName);
        }
    }

    public void deleteResource(ProjectResource resource) throws IOException {
        if (resource instanceof Folder) {
            deleteFolder((Folder) resource);
        } else if (resource instanceof ProjectsManagmentBackEnd.entity.ressources.File) {
            deleteFile((ProjectsManagmentBackEnd.entity.ressources.File) resource);
        }
    }

    public byte[] getFileContent(ProjectsManagmentBackEnd.entity.ressources.File file) throws IOException {
        if (file == null || !(file instanceof ProjectsManagmentBackEnd.entity.ressources.File)) {
            throw new IllegalArgumentException("Resource not a valid file");
        }
        String filePath = calculateFilePath((ProjectsManagmentBackEnd.entity.ressources.File) file);
        return Files.readAllBytes(Path.of(filePath));
}

    private void saveFolder(Folder folder) throws IOException {
        new File(folder.getPath()).mkdir();
        if( folder.getSubResources() != null && !folder.getSubResources().isEmpty() ) {
            for (ProjectResource subResource : folder.getSubResources()) {
                saveResource(subResource);
            }
        }

    }

    private void saveFile(ProjectsManagmentBackEnd.entity.ressources.File file) throws IOException {
        new File(file.getPath()).createNewFile();
    }


    private void renameFolder(Folder folder, String newName) throws IOException {
        String newFolderPath = calculateFolderPath(folder.getParentFolder(), newName);
        new File(calculateFolderPath(folder)).renameTo(new File(newFolderPath));
        folder.setName(newName);
    }

    private void renameFile(ProjectsManagmentBackEnd.entity.ressources.File file, String newName) throws IOException {
        String newFilePath = calculateFilePath(file.getParentFolder(), newName);
        new File(calculateFilePath(file)).renameTo(new File(newFilePath));
        file.setName(newName);
    }

    private void deleteFolder(Folder folder) throws IOException {
        for (ProjectResource subResource : folder.getSubResources()) {
            deleteResource(subResource);
        }
        new File(calculateFolderPath(folder)).delete();
    }

    private void deleteFile(ProjectsManagmentBackEnd.entity.ressources.File file) throws IOException {
        new File(calculateFilePath(file)).delete();
    }

    private String calculateFolderPath(Folder folder) {
        return folder.getParentFolder().getPath() + File.separator + folder.getName() ;
    }

    private String calculateFilePath(ProjectsManagmentBackEnd.entity.ressources.File file) {
        return file.getParentFolder().getPath() + File.separator + file.getName();
    }

    private String calculateFolderPath(Folder parentFolder, String folderName) {
        return parentFolder.getPath() + File.separator + folderName;
    }

    private String calculateFilePath(Folder parentFolder, String fileName) {
        return parentFolder.getPath() + File.separator + fileName;
    }
}