// FileExplorer.js
import React, { useState, useEffect } from 'react';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import { GoFile } from "react-icons/go";
import { BsFolderPlus } from "react-icons/bs";
import { AiOutlineFileAdd } from "react-icons/ai";
import { RiDeleteBinLine, RiPencilLine } from "react-icons/ri";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { irBlack as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import ts from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
import java from 'react-syntax-highlighter/dist/esm/languages/hljs/java';


const RessourcesPage = () => {
    const [fileTree, setFileTree] = useState([]);
    const [selectedFileContent, setSelectedFileContent] = useState('');
    const [expandedNodes, setExpandedNodes] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    SyntaxHighlighter.registerLanguage('js', js)
    SyntaxHighlighter.registerLanguage('jsx', js)
    SyntaxHighlighter.registerLanguage('ts', ts)
    SyntaxHighlighter.registerLanguage('tsx', ts)
    SyntaxHighlighter.registerLanguage('java', java)

    const codeJava =
        `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./Store";
import { Provider } from "react-redux";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <App />
      </LocalizationProvider>
    </Provider>
  </React.StrictMode>
);
}`;

    const htmlCode =
        `
<!DOCTYPE html>
<html>
<body>

<p>
This paragraph
contains a lot of lines
in the source code,
but the browser 
ignores it.
</p>

<p>
This paragraph
contains      a lot of spaces
in the source     code,
but the    browser 
ignores it.
</p>

<p>
The number of lines in a paragraph depends on the size of the browser window. If you resize the browser window, the number of lines in this paragraph will change.
</p>

</body>
</html>
`;


    useEffect(() => {
        const mockFileTree = [
            {
                id: 0,
                name: 'Project Name',
                isFolder: true,
                children: [
                    {
                        id: 1,
                        name: 'src',
                        isFolder: true,
                        children: [
                            { id: 11, name: 'components', isFolder: true },
                            {
                                id: 12,
                                name: 'App.jsx',
                                isFolder: false,
                                content: codeJava,
                                language: 'jsx',
                            },
                        ],
                    },
                    {
                        id: 2,
                        name: 'web',
                        isFolder: true,
                        children: [
                            { id: 21, name: 'README.md', isFolder: false, content: '# My Documentation' },
                            { id: 22, name: 'LICENSE.txt', isFolder: false, content: 'MIT License' },
                            {
                                id: 23,
                                name: 'index.html',
                                isFolder: false,
                                language: 'html',
                                content: htmlCode
                            },
                        ],
                    }
                ]
            }
        ];

        setFileTree(mockFileTree);
    }, []);





    const handleNodeToggle = (event, nodes) => {
        setExpandedNodes(nodes);
    };

    const addNewItem = (parentId, newItem) => {
        setFileTree((prevFileTree) => {
            const updatedFileTree = [...prevFileTree];
            const parentFolder = findItemById(updatedFileTree, parentId);

            if (parentFolder) {
                parentFolder.children = [...(parentFolder.children || []), newItem];
            }

            return updatedFileTree;
        });
    };

    const handleAddItemClick = (isFolder = false) => {
        if (selectedItem.isFolder) {
            let newItemName = prompt(`Enter the name for the new ${isFolder ? 'Folder' : 'File'}:`);
            let fileExtenssion = '';

            if (!isFolder && newItemName) {
                fileExtenssion = prompt(`What is the file extension:`);
            }

            const parentId = selectedItem ? selectedItem.id : 0;

            const newItem = {
                id: Date.now(),
                name: newItemName,
                isFolder: isFolder,

                ...(isFolder
                    ? {
                        children: [],
                    }
                    : {
                        language: fileExtenssion || '',
                        content: fileExtenssion !== ('txt' || 'md') ? `# New File Language (${fileExtenssion})` : '# New File',
                    }),
            };

            addNewItem(parentId, newItem);
        }
    };


    const removeItem = (itemId) => {
        const confirmDelete = window.confirm(`Are you sure about deleting the item ${selectedItem.name}?`);
        if (confirmDelete) {
            setFileTree((prevFileTree) => {
                const updatedFileTree = removeItemById([...prevFileTree], itemId);
                return updatedFileTree;
            });
            setSelectedItem(null);
        }
    };

    const removeItemById = (items, itemId) => {
        return items.reduce((acc, item) => {
            if (item.id === itemId) {
                return acc;
            }

            if (item.children) {
                item.children = removeItemById(item.children, itemId);
            }

            return [...acc, item];
        }, []);
    };

    const editItem = (itemId, newName) => {
        setFileTree((prevFileTree) => {
            const updatedFileTree = updateItemNameById([...prevFileTree], itemId, newName);
            return updatedFileTree;
        });
    };

    const updateItemNameById = (items, itemId, newName) => {
        return items.map((item) => {
            if (item.id === itemId) {
                return { ...item, name: newName };
            }

            if (item.children) {
                item.children = updateItemNameById(item.children, itemId, newName);
            }

            return item;
        });
    };

    // Add this function to find an item by its ID in the tree
    const findItemById = (items, itemId) => {
        for (const item of items) {
            if (item.id === itemId) {
                return item;
            }

            if (item.children) {
                const foundItem = findItemById(item.children, itemId);
                if (foundItem) {
                    return foundItem;
                }
            }
        }

        return null;
    };

    const handleFileClick = (file) => {
        if (!selectedItem.isFolder) {

            if (file.language === 'html') {
                const q = prompt('Do you want to fetch the content of html file [1] or open it on the browser [2] ? ');
                if (q === '2') {
                    const htmlContent = file.content || '<html><body>No content available</body></html>';
                    const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
                    const url = URL.createObjectURL(htmlBlob);

                    window.open(url, '_blank');
                }
                else {
                    setSelectedFileContent(file.content || 'File content not available.');
                }
            } else {
                setSelectedFileContent(file.content || 'File content not available.');
            }
        }
    };



    const renderTreeItems = (items) => {
        return items.map((item) => (
            <TreeItem
                key={item.id}
                nodeId={item.id}
                onClick={() => { setSelectedItem(item); handleFileClick(item); }}
                label={
                    <span>
                        {item.name}
                    </span>
                }
                endIcon={
                    item.isFolder ? (
                        expandedNodes.includes(item.id) ? (
                            <FaFolderOpen className='text-yellow-400' />
                        ) : (
                            <FaFolder className='text-yellow-400' />
                        )
                    ) : (
                        <GoFile />
                    )
                }
            >
                {item.children && renderTreeItems(item.children)}
            </TreeItem>
        ));
    };

    const handleEditClick = (item) => {
        const newName = prompt('Enter the new name:', selectedItem.name);
        if (newName) {
            editItem(selectedItem.id, newName);
        }
    };


    return (
        <div className='flex items-start justify-between w-full max-h-max bg-white rounded-md shadow-md px-3 py-2 h-full space-x-2'>
            <div className='w-[40%] h-full border-r border-r-slate-400 px-2'>
                <div className="flex items-center justify-between">
                    <h2>File Explorer</h2>
                    <div className="flex items-center gap-2">
                        <button
                            className="cursor-pointer mr-1"
                            onClick={() => handleAddItemClick(true)}
                        >
                            <BsFolderPlus />
                        </button>
                        <button
                            className="cursor-pointer mr-1"
                            onClick={() => handleAddItemClick(false)}
                        >
                            <AiOutlineFileAdd />
                        </button>
                    </div>
                </div>
                {selectedItem && (
                    <div className="flex items-center justify-between py-2 px-2 border border-slate-400 rounded-lg shadow my-1">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">{selectedItem.isFolder ? 'Selected Folder : ' : 'Selected File : '}</span>
                            <span className="text-sm font-normal">{selectedItem.name}</span>
                        </div>
                        <div className="flex items-center">
                            <RiPencilLine
                                className="cursor-pointer border-r border-r-slate-300 px-1"
                                onClick={handleEditClick}
                                size={28}
                            />
                            <RiDeleteBinLine
                                className="cursor-pointer text-red-600 ml-1"
                                onClick={() => removeItem(selectedItem.id)}
                                size={20}
                            />
                        </div>
                    </div>
                )}
                <TreeView
                    defaultExpanded={['src', 'web']}
                    defaultCollapseIcon={<FaFolderOpen className='text-yellow-400' />}
                    defaultExpandIcon={<FaFolder className='text-yellow-400' />}
                    expanded={expandedNodes}
                    onNodeToggle={handleNodeToggle}
                >
                    {renderTreeItems(fileTree)}
                </TreeView>
            </div>
            <div className='w-[60%] h-full px-2'>
                <h2>File Content</h2>
                {selectedFileContent && (
                    <span className="text-sm font-mono">
                        <SyntaxHighlighter
                            language={selectedItem.language || 'plaintext'}
                            style={codeStyle} showLineNumbers customStyle={{ borderRadius: "5px", backgroundColor: "#1C1C1C", fontFamily: selectedItem.language ? 'monospace' : 'inherit' }}>
                            {selectedFileContent}
                        </SyntaxHighlighter>
                    </span>
                )}
            </div>
        </div>
    );
};

export default RessourcesPage;
