import useAxios from "../../hooks/useAxios";

async function getAllResourcesByProjectApi(projectId) {
    return await useAxios().get(`/resources/all/${projectId}`);
}

async function getFileContentApi(fileId) {
    return await useAxios().get(`/resources/file/${fileId}/content`);
}

async function createFileApi(file, parentId) {
    const formData = new FormData();
    formData.append("file", file);
    return await useAxios().post(`/resources/newFile/${parentId}`, formData, {
        headers: {
            "Content-Type": file.type,
        },
    })
}

async function createFolderApi(folder) {
    return await useAxios().post(`/resources/newFolder/${folder.parentId}`, folder);
}

export { getAllResourcesByProjectApi, getFileContentApi, createFileApi, createFolderApi };