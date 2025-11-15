const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
const win = new BrowserWindow({
    width: 500,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
    nodeIntegation: true,
    contextIsolation: false
    }
});

console.log('Tentando carregar: http://localhost:5173/'); 

win.loadURL('http://localhost:5173/')
    .then(() => console.log('✅ Página carregada!'))
    .catch(err => console.error('❌ Erro ao carregar:', err));

}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
if (process.platform !== 'darwin') {
    app.quit();
}
});