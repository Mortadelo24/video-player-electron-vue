import { ipcRenderer } from 'electron';
import { IpcService } from 'src/interfaces/global';

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

export default ipcService;