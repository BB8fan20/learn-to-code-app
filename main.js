const { app, BrowserWindow, Menu } = require("electron");
const path = require('path');
const url = require('url');

var IMG_DIR = "/img/";

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 1000, height: 550, frame: false, icon: path.join(__dirname, IMG_DIR, 'logo.png') });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    mainWindow = null;
  });

  var menu = Menu.buildFromTemplate([
    {
      label: "File",
      submenu: [
        {
          label: "Close",
          accelerator: "CmdOrCtrl+Q",
          click() {
            app.quit();
          }
        },
        { type: "separator" },
        {
          label: "Dev Tools",
          submenu: [
            {
              label: "Reload LTC",
              accelerator: "CmdOrCtrl+R",
              click() {
                mainWindow.loadURL(`file://${__dirname}/index.html`);
              }
            },
            {
              label: "Dev Tools",
              accelerator: "CmdOrCtrl+Shift+C",
              click() {
                mainWindow.webContents.openDevTools();
              }
            }
          ]
        }
      ]
    }
  ]);

  Menu.setApplicationMenu(menu);

  //mainWindow.setFullScreen(true);
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q

  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (mainWindow === null) {
    createWindow();
  }
});

app.setAsDefaultProtocolClient("learncode");
