const {app, BrowserWindow, ipcMain} = require('electron');
const keytar = require('keytar');
const { default: installExtension, REDUX_DEVTOOLS } = require('electron-devtools-installer');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadURL("http://localhost:4200/");
  // win.loadFile(path.join(__dirname, '/dist/index.html'));
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', function() {
  createWindow();
  installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
});

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
  keytar.getPassword('MailBean', id).then( result => {
    event.returnValue = result;
  });
});

ipcMain.on('set-password', (event, id, pass) => {
  event.returnValue = keytar.setPassword('MailBean', id, pass);
});

ipcMain.on('delete-password', (event, id) => {
  event.returnValue = keytar.deletePassword('MailBean', id);
});
