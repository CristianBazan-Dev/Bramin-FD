// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");



const mongoose = require("mongoose");


let win;
let secondaryWin;
let thirdWin;
let fourthWin;
let fifthWin;

const createWindow = () => {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  const mainMenu = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(mainMenu);

  // and load the index.html of the app.
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Algunas APIs pueden solamente ser usadas despues de que este evento ocurra.
app.whenReady().then(() => {
  createWindow();
  createThirdWin();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow() ;
  });
});

function createSecondaryWindow() {
  secondaryWin = new BrowserWindow({
    width: 300,
    height: 720,
    // frame: false,
    // autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      enableRemoteModule: true,
    },
    maximizable: false,
  });
  secondaryWin.loadURL(
    isDev
      ? "http://localhost:3000/screens/create-request.html"
      : `file://${path.join(__dirname, "../build/screens/create-request.html")}`
  );
  secondaryWin.setMenu(null);
}

function createThirdWin() {
  thirdWin = new BrowserWindow({
    width: 300,
    height: 720,
    // frame: false,
    // autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      enableRemoteModule: true,
    },
    maximizable: false,
  });
  thirdWin.loadURL(
    isDev
      ? "http://localhost:3000/screens/create-expense.html"
      : `file://${path.join(__dirname, "../build/screens/create-expense.html")}`
  );
  thirdWin.setMenu(mainMenu);
}

function createFourthWin() {
  fourthWin = new BrowserWindow({
    width: 300,
    height: 720,
    // frame: false,
    // autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      enableRemoteModule: true,
    },
    maximizable: false,
  });
  fourthWin.loadURL(
    isDev
      ? "http://localhost:3000/screens/create-service.html"
      : `file://${path.join(__dirname, "../build/screens/create-service.html")}`
  );
  fourthWin.setMenu(null);
}


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. Tu también puedes ponerlos en archivos separados y requerirlos aquí.

// template menu
const templateMenu = [
  {
    label: "Acciones", 
    submenu: [
      {
        label: "Crear pedido",
        accelerator: "F1",
        click() {
          createSecondaryWindow();
        },
      },
      {
        label: "Añadir gasto",
        accelerator: "F2",
        click() {
          createThirdWin();
        },
      },
      {
        label: "Crear servicio",
        accelerator: "F3",
        click() {
          createFourthWin();
        },
      },
    ]
  },

  {
    label: "Actualizar",
    accelerator: "F5",
    click() {
      win.reload();
    },
  },
  {
    label: "DevTools",
    submenu: [
      {
        label: "Show/Hide Dev Tools",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        role: "reload",
      },
    ],
  },
];

// DB connection
const { ATLAS_URI  } = require("./config"); 

mongoose
  .connect(
    ATLAS_URI
  )
  .then((db) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

// Routes
// Routes

// ---- expense routes ------ 

// get 
const Expenses = require("./models/Expenses");

ipcMain.on("get-expenses", async (e, args) => {
  const expenses = await Expenses.find();
  e.reply("get-expenses", JSON.stringify(expenses));
});


// create 
ipcMain.on('new-expense', async (e, args) =>{
  const newExpense = new Expenses(args); 
  const saveExpense = await newExpense.save()
  console.log(newExpense)
  e.reply('Nuevo gasto incluido!', JSON.stringify(saveExpense))
})

// update 


// delete 
ipcMain.on('delete-expense', async(e,args) => {
  const deletedExpense = await Expenses.findByIdAndDelete(args)

  e.reply('delete-expense', JSON.stringify(deletedExpense))
})

module.exports = {
  createWindow,
  createSecondaryWindow,
  createThirdWin,
  createFourthWin
};
