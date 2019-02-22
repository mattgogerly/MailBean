const {app, BrowserWindow, ipcMain} = require('electron');
const keytar = require('keytar');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadURL("http://localhost:4200/auth");
  // win.loadFile(path.join(__dirname, '/dist/index.html'));
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

ipcMain.on('get-password', (event, id) => {
  event.returnValue = keytar.getPassword('MailBean', id);
});

ipcMain.on('set-password', (event, id, pass) => {
  event.returnValue = keytar.setPassword('MailBean', id, pass);
});

ipcMain.on('delete-password', (event, id) => {
  event.returnValue = keytar.deletePassword('MailBean', id);
});
