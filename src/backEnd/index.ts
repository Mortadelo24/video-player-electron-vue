import fs from 'fs';
import { dialog, ipcMain } from 'electron';

const folders: string[] = [];
const foldersPath = "./folders.json";
export const chargeFolders = () => {

  try {
    const foldersFromData = JSON.parse(fs.readFileSync(foldersPath, 'utf8'))
    folders.push(...foldersFromData)
  } catch (error) {
    saveFolders()
  }
}
const saveFolders = () => {
  fs.writeFileSync(foldersPath, JSON.stringify(folders))
}
const addFolder = (path: string) => {
  if (folders.includes(path)) {
    return
  }
  folders.push(path)

}

const addPathToFolder = () => {
  const paths =  dialog.showOpenDialogSync({
    properties: ['openDirectory']
  })
  if(!paths) return

  paths.forEach(path => addFolder(path))
  saveFolders();
  return folders
}

ipcMain.on("getFolders",(event)=>{
  event.reply('foldersUpdated', folders);
})
ipcMain.handle('dialog:addPathToFolder', addPathToFolder)
ipcMain.handle('getter:getFolders', ()=>{
    return folders
})
ipcMain.handle('getter:getFolderContent',(event, path:string)=>{
    return fs.readdirSync(path).filter(file=>{
        const pathSections = file.split('.')
        if (pathSections.length == 1) return true;
        const fileExtencion = pathSections[pathSections.length - 1]
        return ['mp4'].includes(fileExtencion)

    });
})
