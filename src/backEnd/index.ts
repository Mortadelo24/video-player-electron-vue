import fs, { Dirent } from 'fs';
import { dialog, ipcMain } from 'electron';
import pathModule from 'path'
import {randomUUID} from 'crypto'


const folders: string[] = [];
const foldersPath = "./folders.json";
export const chargeFolders = () => {

  try {
    const foldersFromData: string[] = JSON.parse(fs.readFileSync(foldersPath, 'utf8'))
    folders.push(...foldersFromData)
  } catch (error) {
    saveFolders()
  }
  folders.forEach((path) => {
    try {
      fs.statSync(path)
    } catch (err) {
      removeFolderPath(path)

    }
  })

}
const removeFolderPath = (pathToRemove: string) => {
  const filteredFolders = folders.filter((path) => {
    if (pathToRemove == path) return false
    return true
  })
  folders.length = 0
  folders.push(...filteredFolders)
  saveFolders()
  return folders
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
  const paths = dialog.showOpenDialogSync({
    properties: ['openDirectory']
  })
  if (!paths) return folders

  paths.forEach(path => addFolder(path))
  saveFolders();
  return folders
}


ipcMain.handle('dialog:addPathToFolder', addPathToFolder)
ipcMain.handle('getter:getFolderContent', (event, path?: string) => {
  // Todo: change the way files are represented to consider folders and to be the same
  if(!path) return folders.map((pathItem) =>{
    return {
      name:  pathModule.basename(pathItem) ,
      isDirectory: true,
      path: pathItem,
      uuid: randomUUID()
    }
  })
  const filteredDirents = fs.readdirSync(path, { withFileTypes: true, encoding: 'utf8' }).filter(dirent => {
    if (dirent.isDirectory()) return true
    return ['.mp4'].includes(pathModule.extname(dirent.name))
  });
  return filteredDirents.map((dirent) => {
    return {
      name: dirent.name,
      isDirectory: dirent.isDirectory(),
      path: null,
      uuid: randomUUID()
    }
  })
})
