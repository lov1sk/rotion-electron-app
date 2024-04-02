import { BrowserWindow, Menu, nativeImage, Tray } from "electron";
import path from "path";

export function createTray(window: BrowserWindow) {
  const icon = nativeImage.createFromPath(
    path.resolve(__dirname, "..", "..", "resources", "rotionTemplate.png")
  );

  const tray = new Tray(icon);
  const menu = Menu.buildFromTemplate([
    { label: "Rotion", enabled: false },
    { type: "separator" },
    { label: "Criar novo documento", click: () => {} },
    { type: "separator" },
    { label: "Sair da aplicação", role: "quit" },
  ]);

  tray.setContextMenu(menu);
}
