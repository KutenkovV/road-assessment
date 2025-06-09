import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { BrowserWindow } from '@electron/remote';

export type Channels = 'ipc-example';

type IpcHandler = (...args: unknown[]) => void;

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, handler: IpcHandler) {
      const listener = (_event: IpcRendererEvent, ...args: unknown[]) =>
        handler(...args);
      ipcRenderer.on(channel, listener);
      return () => ipcRenderer.removeListener(channel, listener);
    },
    once(channel: Channels, handler: IpcHandler) {
      ipcRenderer.once(channel, (_event, ...args) => handler(...args));
    },
  },

  dialog: {
    openFile(options: any) {
      return ipcRenderer.invoke('dialog:openFile', options);
    },
    saveFile(options: any) {
      return ipcRenderer.invoke('dialog:saveFile', options);
    },
  },

  user: {
    read() {
      return ipcRenderer.invoke('user:read');
    },
    write(config: any) {
      return ipcRenderer.invoke('user:write', config);
    },
  },

  roaddata: {
    loadXls(path: string) {
      return ipcRenderer.invoke('roaddata:load', path);
    },
  },

  appControl: {
    close() {
      ipcRenderer.send('closeApp');
    },
    minimize() {
      ipcRenderer.send('minimizeApp');
    },
    maximize() {
      ipcRenderer.send('maximizeApp');
    },
  },
});
