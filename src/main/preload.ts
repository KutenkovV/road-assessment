import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { BrowserWindow } from '@electron/remote'

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
  // ipcRenderer: { ...ipcRenderer, on: ipcRenderer.on },

  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },

  openFile(options: any) {
    return ipcRenderer.invoke('dialog:openFile', options)
  },
  saveFile(options: any) {
    return ipcRenderer.invoke('dialog:saveFile', options)
  },
  userRead() {
    return ipcRenderer.invoke("user:read")
  },
  userWrite(config: any) {
    return ipcRenderer.invoke("user:write", config)
  },
  loadXls(path: string) {
    return ipcRenderer.invoke("roaddata:load", path)
  },

  //////////////////
  closeApp() {
    ipcRenderer.send('closeApp');
  },
  minimizeApp() {
    ipcRenderer.send('minimizeApp');
  },
  maximizeApp() {
    ipcRenderer.send('maximizeApp');
  }
});
