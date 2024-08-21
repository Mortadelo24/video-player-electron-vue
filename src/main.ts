import { app, BrowserWindow } from 'electron';
import path from 'path';
import { chargeFolders, folders } from './backEnd/index';
import express from 'express'
import fs from 'fs';


function isPathInsideFolder(filePath:string, folderPath:string) {
  const relative = path.relative(folderPath, filePath);
  return !relative.startsWith('..') && !path.isAbsolute(relative);
}

const isFileInAllowedFolders = (filePath:string) =>{
  let isAllawed = false
  folders.forEach((folderPath:string)=>{
    if (isPathInsideFolder(filePath, folderPath)){
      
      isAllawed =  true
      return  
    }
  })
  return isAllawed
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}


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


  // chargeFloders
  chargeFolders();
  // run http server

  const httpServer = express();
  const port = 2509;


  httpServer.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
  });
  httpServer.get('/getVideo/:videoPath', (req, res) => {
    const videoPath = Buffer.from(req.params.videoPath, "base64").toString("utf8")
    const stat = fs.statSync(videoPath)

    if ( !isFileInAllowedFolders(videoPath)){
      return res.status(403).json({ message: 'Acces denied' }); 
    }
   

    const range = req.headers.range;
    const fileSize = stat.size

    if (!range) {
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4'
      });
      const readStream = fs.createReadStream(videoPath);
      readStream.pipe(res);

    } else {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize
        || end >= fileSize || start > end) {
        res.status(416).send('Requested range not satisfiable');
        return;
      }

      const chunksize = (end - start) + 1;
      res.writeHead(206, {
        'Content-Range': 'bytes ' + start + '-' + end + '/' + fileSize,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4'

      });

      const stream = fs.createReadStream(videoPath, { start, end });
      stream.pipe(res);
    }

  })




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

