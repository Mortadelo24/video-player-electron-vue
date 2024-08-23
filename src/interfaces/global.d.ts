export interface FileInfo {
    isDirectory: boolean
    name: string
    path: string | null,
    uuid: string,
    videoURL: string | null,
    previewImage: string | null
}

export interface IpcService {
    on(channel: string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void): void;
    removeListener(channel: string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void): void;
    invoke(channel: string, ...args: any[]): Promise<any>;
}