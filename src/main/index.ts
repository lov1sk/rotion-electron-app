import { app, shell, BrowserWindow } from "electron";
import path, { join, resolve } from "node:path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import icon from "../../resources/icon.png";
import { createURLRoute, createFileRoute } from "electron-router-dom";
import "./ipc";
import "./store";
import { createTray } from "./tray";

function createWindow({ id }: { id: string }): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    minWidth: 650,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    icon: path.resolve(__dirname, "..", "..", "resources", "icon.png"),
    titleBarOverlay:
      process.platform != "darwin"
        ? {
            color: "#2f324100",
            symbolColor: "#c1bfc7",
          }
        : false,
    titleBarStyle: process.platform == "darwin" ? "hiddenInset" : "hidden",
    trafficLightPosition: {
      x: 20,
      y: 20,
    },
    backgroundColor: "#17141f",
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
  });

  createTray(mainWindow);
  // O arquivo que será carregado caso estejamos no ambiente de desenvolvimento
  // Estou pa
  const devServerURL = createURLRoute("http://localhost:5173", id);

  // O Arquivo html para quando o app estiver em produção
  const fileRoute = createFileRoute(
    join(__dirname, "../renderer/index.html"),
    id
  );
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(devServerURL);
  } else {
    mainWindow.loadFile(...fileRoute);
  }
}

// Se estiver no macOS, ele seta como icone o png no caminho resources/icon.png
if (process.platform === "darwin") {
  app.dock.setIcon(resolve(__dirname, "icon.png"));
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId("com.electron");

  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow({ id: "main" });

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow({ id: "main" });
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
