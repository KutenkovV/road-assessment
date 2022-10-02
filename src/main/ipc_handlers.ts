import {app, dialog, ipcMain} from "electron";
import fs from "fs";
import {toJS} from "mobx";
import path from "path";
import { loadXls } from "./xlsx_processing";

export default function bindIPC() {
  ipcMain.handle('dialog:openFile', async (_event, options) => {
    const {canceled, filePaths} = await dialog.showOpenDialog(options)
    if (canceled)
      return null;
    return filePaths[0];
  });

  ipcMain.handle('dialog:saveFile', async (_event, options) => {
    const {canceled, filePath} = await dialog.showSaveDialog(options)
    if (canceled)
      return null;
    return filePath;
  });

  ipcMain.handle("user:read", async (_event) => {
    const pth = path.join(app.getPath("userData"), 'config.json');
    let data: any = "{}"
    try {
      data = await fs.promises.readFile(pth);
    } catch (e) {
      console.error(e)
    }
    return JSON.parse(data.toString());
  })

  ipcMain.handle("user:write", async (_event, data) => {
    const pth = path.join(app.getPath("userData"), 'config.json');
    await fs.promises.writeFile(pth, JSON.stringify(toJS(data)));
  })

  // ipcMain.handle("nagruzka:save", async (_event, f: string, nagruzkaLines: Array<NagruzkaLine>) => {
  //   await fs.promises.writeFile(f, JSON.stringify(nagruzkaLines));
  // })

  ipcMain.handle("nagruzka:load", async (_event, f) => {
    const data = await fs.promises.readFile(f);
    return JSON.parse(data.toString());
  })

  ipcMain.handle("roaddata:load", async (_event, f) => {
    let data = await loadXls(f);
    return data;
  })
}
