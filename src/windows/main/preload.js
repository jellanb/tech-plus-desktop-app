// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('action', {
    openWindow: (windowPath, width, height) => {
        ipcRenderer.send('open-new-window', windowPath, width, height)
    },
    addProduct: (operation, data) => ipcRenderer.invoke('crud-operations', operation, data)
});