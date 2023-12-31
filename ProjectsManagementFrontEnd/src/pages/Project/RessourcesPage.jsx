import React, { useState, useEffect } from 'react';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { FaFile, FaFolder, FaFolderOpen, FaRegFileCode } from 'react-icons/fa';
import { VscNewFile } from "react-icons/vsc";
import { BsFolderPlus } from "react-icons/bs";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useDispatch, useSelector } from 'react-redux';
import { getFileContent, createFile, createFolder, getAllResources } from '../../features/project/resourceSlice'
import { useParams } from 'react-router-dom';
import { MdCreateNewFolder } from 'react-icons/md';


const RessourcesPage = () => {
    const dispatch = useDispatch();
    const { resources, fileContent, error } = useSelector(state => state.resources)
    const { project } = useSelector((state) => state.project);
    const { id } = useParams()

    useEffect(() => {
        dispatch(getAllResources(id));
    }, []);

    const [expandedNodes, setExpandedNodes] = useState([]);
    const [parentFolderId, setParentFolderId] = useState('');
    const [newFolderName, setNewFolderName] = useState('');
    const [fileIsSelected, setfileIsSelected] = useState(false);
    const [fileId, setFileId] = useState('');
    const [isCreateFolder, setIsCreateFolder] = useState(false);
    const [currentLangage, setCurrentLangage] = useState('javascript');
    const [isChoiceModalOpen, setIsChoiceModalOpen] = useState(false);
    
    const handleToggle = (nodeIds) => {
        setExpandedNodes(nodeIds);
    };

    const renderTree = (nodes) => (
        <TreeItem
            key={nodes.id}
            nodeId={nodes.id}
            onClick={() => {
                if (nodes.type === 'FOLDER') {
                    setParentFolderId(nodes.id);
                } else {
                    setParentFolderId(nodes.parentId);
                }
            }}
            endIcon={nodes.type === 'FOLDER' ? (
                <FaFolder className='text-yellow-400' />
            ) : (
                (nodes.fileExtension === 'txt' || nodes.fileExtension === 'md') ?
                    <FaFile />
                    : <FaRegFileCode size={30} />
            )}
            label={nodes.type === 'FOLDER' ? (
                <div className='text-sm font-semibold' onClick={() => setfileIsSelected(false)}>
                    {nodes.name}
                </div>
            ) : (
                <div className='text-sm font-semibold' onClick={() => { setfileIsSelected(true); handleFileClick(nodes.id, nodes.fileExtension) }}>
                    {nodes.name}
                </div>
            )}
        >
            {Array.isArray(nodes.subResources) && nodes.subResources.length > 0
                ? nodes.subResources.map((node) => renderTree(node))
                : null}
        </TreeItem>
    );

    const handleFileClick = (fileId, fileExtension) => {
        setFileId(fileId);
        dispatch(getFileContent(fileId));
        switch (fileExtension) {
            case 'js':
                setCurrentLangage('javascript');
                break;
            case 'java':
                setCurrentLangage('java');
                break;
            case 'ts':
                setCurrentLangage('typescript');
                break;
            case 'html':
                setCurrentLangage('html');
                setIsChoiceModalOpen(true);
                break;
            case 'py':
                setCurrentLangage('py');
                break;
            default:
                break;
        }
        
    };

    const handleChoice = (choice) => {
        setIsChoiceModalOpen(false);
        if (choice === 'browser') {

          if (currentLangage === 'html' && fileId) {
            const blob = new Blob([fileContent], { type: 'text/html' });
            const blobUrl = URL.createObjectURL(blob);
            window.open(blobUrl, '_blank');
            URL.revokeObjectURL(blobUrl)

          }

        } 
      };

    const handleCreateFile = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                dispatch(createFile({ file: file, parentId: parentFolderId, projectId: id }));

            }
        });
        fileInput.click();
    };

    const handleCreateFolder = () => {
        if (newFolderName !== '' && newFolderName !== null) {
            dispatch(createFolder({
                folder: {
                    name: newFolderName,
                    parentId: parentFolderId,
                },
                projectId: id
            }));
        }
        setIsCreateFolder(false);
    };

    return (
        <div className='relative flex items-start justify-between w-full bg-white rounded-md shadow-md px-3 py-2 space-x-2'
            style={{
                height: 'calc(100vh - 150px)'
            }}
        >
            {error && <div className="absolute top-3 left-[30%] w-full max-w-md p-2 bg-red-100 text-red-600">{error}</div>}
            {isChoiceModalOpen && (
                <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center'>
                    <div className='bg-white p-4 rounded-md'>
                        <p className='mb-4'>Chose what way you need</p>
                        <button
                            className='mr-2 px-4 py-2 bg-blue-500 text-white rounded'
                            onClick={() => handleChoice('browser')}
                        >
                            Open in Browser
                        </button>
                        <button
                            className='px-4 py-2 bg-green-500 text-white rounded'
                            onClick={() => handleChoice('fetch')}
                        >
                            Fetch Content
                        </button>
                    </div>
                </div>
            )}
            <div className='w-[40%] h-full border-r border-r-slate-400 px-2 overflow-auto'>
                <div className="flex items-center justify-between mb-3 border-b border-b-slate-300">
                    <h2> {project.longName} </h2>
                    <div className='flex gap-4'>
                        <button
                            className='hover:bg-slate-200 p-1 rounded-full'
                            onClick={parentFolderId && handleCreateFile}> <VscNewFile size={20} /> </button>
                        <button
                            className='hover:bg-slate-200 p-1 rounded-full'
                            onClick={() => { parentFolderId && setIsCreateFolder(true) }}><BsFolderPlus size={20} /></button>
                    </div>
                    {
                        isCreateFolder && <div className='h-full w-screen fixed top-0 left-0 bottom-0 bg-black/80 z-40 flex items-center'>
                            <dialog className=' py-5 px-4 rounded' open={isCreateFolder} >
                                <div className="flex flex-col items-center justify-start">
                                    <h2 className="text-lg font-semibold mb-2">Create Folder</h2>
                                    <div className="flex items-center gap-4 w-full">
                                        <MdCreateNewFolder size={29} className='text-yellow-400' />
                                        <input
                                            type="text"
                                            autoFocus
                                            className='border border-black rounded-md px-2 py-1 text-sm font-semibold'
                                            value={newFolderName}
                                            onChange={(e) => setNewFolderName(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleCreateFolder();
                                                }
                                            }}
                                        />
                                        <button onClick={handleCreateFolder} className='p-1 bg-black text-xs text-white font-medium tracking-wider rounded'>Create</button>
                                    </div>
                                </div>
                            </dialog>
                        </div>
                    }
                </div>
                <TreeView
                    defaultCollapseIcon={<FaFolderOpen className='text-yellow-400' />}
                    defaultExpandIcon={<FaFolder className='text-yellow-400' />}
                    expanded={expandedNodes}
                    onNodeToggle={(_, nodeIds) => handleToggle(nodeIds)}
                >
                    <TreeItem
                        key={project.id}
                        nodeId={project.id}
                        label={<p className='text-sm font-semibold' >{project.shortName}</p>}
                        endIcon={<FaFolder className='text-yellow-400' />}
                    >
                        {resources.map((node) => renderTree(node))}
                    </TreeItem>
                </TreeView>

            </div>
            <div className='w-[60%] h-full px-2 overflow-auto'>
                {
                    (fileIsSelected && fileContent) ?
                        <SyntaxHighlighter
                            showLineNumbers
                            customStyle={{ borderRadius: "10px", backgroundColor: "#1C1C1C", height: "100%", fontFamily: 'monospace' }}
                            style={codeStyle}
                            language={currentLangage}
                            wrapLongLines
                        >
                            {fileContent}
                        </SyntaxHighlighter>
                        : (
                            <div className="flex items-center justify-center h-full">
                                No file selected
                            </div>
                        )
                }
            </div>
        </div >
    );
};

export default RessourcesPage;
