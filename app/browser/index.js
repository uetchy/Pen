import app from "app";
import BrowserWindow from "browser-window";

let mainWindow = null;

require('crash-reporter').start();

const launchMainWindow = () => {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  // mainWindow.maximize();
  mainWindow.loadUrl('file://' + __dirname + '/../renderer/index.html');
  mainWindow.openDevTools();
  mainWindow.on('closed', () => mainWindow = null);
};

app.on('window-all-closed', () => app.quit());
app.on('ready', launchMainWindow);
