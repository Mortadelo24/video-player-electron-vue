// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('testApi', {
    test: () => ipcRenderer.send('testConsole'),
    a: "2"
})

contextBridge.exposeInMainWorld('mainApp', {
    addPath: () => ipcRenderer.invoke('dialog:addPathToFolder'),
    getFolders: ()=> ipcRenderer.invoke('getter:getFolders'),
    getFolderContent: (path:string) => ipcRenderer.invoke('getter:getFolderContent', path)
})

