// See the Electron documentation for details on how to use preload scripts:

import ipcService from "./API/ipcService"

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld("ipcService", ipcService)

