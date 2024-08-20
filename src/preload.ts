// See the Electron documentation for details on how to use preload scripts:

import { IpcService } from 'src/interfaces/global';
import { ipcRenderer, contextBridge } from 'electron';
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const ipcService: IpcService = {
    on(channel, listener) {
      ipcRenderer.on(channel, listener);
    },
    removeListener(channel, listener) {
      ipcRenderer.removeListener(channel, listener);
    },
    invoke(channel, ...args){
      return ipcRenderer.invoke(channel, ...args);
    }
  
  
  };

contextBridge.exposeInMainWorld("ipcService", ipcService)

