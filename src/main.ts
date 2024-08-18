import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import fs from 'fs';


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}
////
const folders: string[] = [];
const foldersPath = "./folders.json";
const chargeFolders = () => {

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
const getFolders = ()=>{
  return folders
}

ipcMain.handle('dialog:addPathToFolder', addPathToFolder)
ipcMain.handle('getter:getFolders', getFolders)




const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // maxWidth:1024,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }


  // charge data
  chargeFolders();




};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

