const { app, BrowserWindow, screen, ipcMain } = require('electron');
const { createDataBase, closeDataBase } = require('./database/sqlite_client');
const { create_product_controller } = require('./controllers/product/create_product_controller/create_product_controller');
const path = require('node:path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  //Getting screen size
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    minimizable: false,
    hiddenInMissionControl: false,
    fullscreen: true,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, '/windows/main/preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '/windows/main/index.html'));
  //open new window event
  ipcMain.on('open-new-window', ({}, windowPath, width, height) => {
    // Crear una nueva ventana
    if (BrowserWindow.getAllWindows().length <= 1) {
    const newWindow = new BrowserWindow({
      width: width,
      height: height,
      fullscreen: false,
      minimizable: true
      // Opciones adicionales de configuración de la ventana
    });

    // Cargar el contenido en la nueva ventana

      newWindow.loadFile(path.join(__dirname, `/windows/${windowPath}`));
    }
  });

  //create module
  ipcMain.on('crud-operations', ({}, operation, data) => {
    switch (operation) {
      case 'create-product':
        create_product_controller(data)
            .then(r => console.log('product created successfully'))
            .catch(e => console.error('error creating product', e));
        break;
    }
  });

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  createDataBase();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    closeDataBase();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.