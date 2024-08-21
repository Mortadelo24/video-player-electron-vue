import fs, { Dirent } from 'fs';
import { dialog, ipcMain } from 'electron';
import pathModule from 'path'
import { randomUUID } from 'crypto'


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
const getVideoURLFromPath = (path: string) => {
  return 'http://localhost:2509/getVideo/' + Buffer.from(path, "utf8").toString("base64")
}


ipcMain.handle('dialog:addPathToFolder', addPathToFolder)
ipcMain.handle('getter:getFolderContent', (event, path?: string) => {
  const filesPath: string[] = []
  let isRootFolder = path? false: true

  if (!path) filesPath.push(...folders)
  else {
    const filteredDirents = fs.readdirSync(path, { withFileTypes: true, encoding: 'utf8' }).filter(dirent => {
      if (dirent.isDirectory()) return true
      return ['.mp4'].includes(pathModule.extname(dirent.name))
    });
    filesPath.push(...filteredDirents.map((dirent)=>{
      return pathModule.join(dirent.parentPath , dirent.name) 
    }))

  }

  const mapedPaths = filesPath.map((pathItem)=>{
    const elementStat = fs.statSync(pathItem)
    return {
      name: pathModule.basename(pathItem),
      isDirectory: elementStat.isDirectory(),
      path: isRootFolder? pathItem: null,
      uuid: randomUUID(),
      videoURL: elementStat.isFile()? getVideoURLFromPath(pathItem) : null
    }
  })
  console.log(mapedPaths)
  return mapedPaths


  if (!path) return folders.map((pathItem) => {
    return {
      name: pathModule.basename(pathItem),
      isDirectory: true,
      path: pathItem,
      uuid: randomUUID(),
      videoURL: null
    }
  })
  // todo: refactor all thi function
  fs.statSync(path)

  const filteredDirents = fs.readdirSync(path, { withFileTypes: true, encoding: 'utf8' }).filter(dirent => {
    if (dirent.isDirectory()) return true
    return ['.mp4'].includes(pathModule.extname(dirent.name))
  });
  return filteredDirents.map((dirent) => {
    return {
      name: dirent.name,
      isDirectory: dirent.isDirectory(),
      path: null,
      uuid: randomUUID(),
      videoURL: getVideoURLFromPath(path + "\\" + dirent.name),
    }
  })
})
