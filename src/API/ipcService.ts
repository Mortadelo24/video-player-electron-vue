import { ipcRenderer } from 'electron';

interface IpcService {
  on(channel: string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void): void;
  removeListener(channel: string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void): void;
}

const ipcService: IpcService = {
  on(channel, listener) {
    ipcRenderer.on(channel, listener);
  },
  removeListener(channel, listener) {
    ipcRenderer.removeListener(channel, listener);
  }
};

export default ipcService;