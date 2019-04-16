const { app, BrowserWindow, ipcMain } = require('electron');
const requestPromise = require('minimal-request-promise');
const child_process = require('child_process');
const kill = require('tree-kill');
const path = require('path');
const url = require('url');
const keytar = require('keytar');
const log = require('electron-log');
const fixPath = require('fix-path');

log.transports.file.level = 'info';
log.transports.file.file = '/Users/mattgogerly/MailBean/log.log';

const platform = process.platform;
const apiUrl = 'http://localhost:36024/accounts';
const isDev = process.mainModule.filename.indexOf('app.asar') === -1;

let filepath;
if (isDev){
  filepath = __dirname;
} else {
  filepath = process.resourcesPath;
}

let serverProcess;
try {
  if (platform === 'win32') {
    serverProcess = child_process
      .spawn('cmd.exe', ['/c', 'java -jar API.jar'],
        {
          cwd: path.join(filepath, '/api')
        });
  } else {
     serverProcess = child_process
       .spawn('java', ['-jar', path.join(filepath, '/api/API.jar')]);
  }
} catch (err) {
  log.error(err.toString());
}

serverProcess.stdout.on('data', data => {
  log.info(data.toString());
});

serverProcess.stderr.on('data', data => {
  log.error(data.toString());
});

serverProcess.on('error', data => {
  log.error(data.toString());
});

let loadingWin;
let win;

function createWindow(type) {
  if (type === 'main') {
    win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    });

    win.loadFile(path.join(filepath, '/dist/index.html'));

    if (loadingWin != null) {
      loadingWin.close();
      loadingWin = null;
    }

    win.on('closed', () => {
      win = null;
    });
  } else if (type === 'loading') {
    loadingWin = new BrowserWindow({
      width: 600,
      height: 400,
      frame: false,
      center: true,
      resizable: false,
      skipTaskbar: true,
      webPreferences: {
        nodeIntegration: true
      }
    });

    loadingWin.loadFile(path.join(filepath, '/splash.html'));
  }
}

function start() {
  if (loadingWin == null) {
    createWindow('loading');
  }

  requestPromise.get(apiUrl).then(() => {
    log.info('API started..');
    createWindow('main');
  }, () => {
    setTimeout(() => {
      start();
    }, 1000);
  });
}

app.on('ready', function() {
  start();
});

app.on('window-all-closed', () => {
  if (serverProcess) {
    kill(serverProcess.pid, 'SIGTERM', function () {
      log.info('API process killed, exiting..');
      serverProcess = null;
      app.quit();
    });
  } else {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

ipcMain.on('get-password', (event, id) => {
  keytar.getPassword('MailBean', id)
    .then(result => {
      event.returnValue = result;
    });
});

ipcMain.on('set-password', (event, id, pass) => {
  event.returnValue = keytar.setPassword('MailBean', id, pass);
});

ipcMain.on('delete-password', (event, id) => {
  event.returnValue = keytar.deletePassword('MailBean', id);
});
