package ProjectsManagmentBackEnd.mappers;

import ProjectsManagmentBackEnd.dtos.resources.FileDTO;
import ProjectsManagmentBackEnd.dtos.resources.FolderDTO;
import ProjectsManagmentBackEnd.dtos.resources.ProjectResourceDTO;
import ProjectsManagmentBackEnd.entity.project.ProjectResource;
import ProjectsManagmentBackEnd.entity.ressources.File;
import ProjectsManagmentBackEnd.entity.ressources.Folder;

import java.util.List;
import java.util.stream.Collectors;

public class ProjectResourceMapper {

    public static ProjectResourceDTO toDto(ProjectResource entity) {
        ProjectResourceDTO dto = new ProjectResourceDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setType( entity.getType() );
        if (entity.getParentFolder() != null) {
            dto.setParentId(entity.getParentFolder().getId());
        }
        return dto;
    }
    public static FolderDTO toDto(Folder entity) {
        FolderDTO dto = new FolderDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setType( entity.getType() );
        dto.setProjectId( entity.getProject() );
        dto.setSubResources(ProjectResourceMapper.toDtoList(entity.getSubResources()));
        if (entity.getParentFolder() != null) {
            dto.setParentId(entity.getParentFolder().getId());
        }
        return dto;
    }

    public static Folder toEntity(FolderDTO dto) {
        Folder entity = new Folder();
        entity.setName(dto.getName());
        entity.setType( dto.getType() );
        if( dto.getProjectId() != null ) {
            entity.setProject( dto.getProjectId() );
        }
        if( dto.getSubResources() != null && !dto.getSubResources().isEmpty() ) {
            entity.setSubResources(ProjectResourceMapper.toEntityList(dto.getSubResources()));
        }
        return entity;
    }

    public static FileDTO toDto(File entity) {
        FileDTO dto = new FileDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setType( entity.getType() );
        dto.setFileExtension(entity.getFileExtension());
        if (entity.getParentFolder() != null) {
            dto.setParentId(entity.getParentFolder().getId());
        }
        return dto;
    }

    public static File toEntity(FileDTO dto) {
        File entity = new File();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setType( dto.getType() );
        entity.setFileExtension(dto.getFileExtension());
        return entity;
    }


    public static List<ProjectResourceDTO> toDtoList(List<ProjectResource> entities) {
        return entities.stream().map(ProjectResourceMapper::toDto).collect(Collectors.toList());
    }

    public static List<ProjectResource> toEntityList(List<ProjectResourceDTO> dtos) {

        return dtos
                .stream()
                .map((ProjectResourceDTO resource) -> {
                    if( resource instanceof FolderDTO dto ) {
                        return toEntity(dto);
                    } else {
                        return toEntity((FileDTO) resource);
                    }
                })
                .collect(Collectors.toList());
    }
}
