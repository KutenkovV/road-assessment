import {
  app,
  Menu,
  shell,
  BrowserWindow,
  MenuItemConstructorOptions,
} from 'electron';

interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
  selector?: string;
  submenu?: DarwinMenuItemConstructorOptions[] | Menu;
}

const isDev =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

export default class MenuBuilder {
  constructor(private mainWindow: BrowserWindow) {}

  buildMenu(): Menu {
    if (isDev) {
      this.setupDevelopmentEnvironment();
    }

    const template =
      process.platform === 'darwin'
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    return menu;
  }

  private setupDevelopmentEnvironment(): void {
    this.mainWindow.webContents.on('context-menu', (_, props) => {
      const { x, y } = props;
      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => this.mainWindow.webContents.inspectElement(x, y),
        },
      ]).popup({ window: this.mainWindow });
    });
  }

  private buildDarwinTemplate(): MenuItemConstructorOptions[] {
    return [
      this.getAppMenu(),
      this.getEditMenu(),
      this.getViewMenu(),
      this.getWindowMenu(),
      this.getHelpMenu(),
    ];
  }

  private buildDefaultTemplate(): MenuItemConstructorOptions[] {
    return [
      {
        label: 'File',
        submenu: [
          { label: 'Open', accelerator: 'Ctrl+O' },
          {
            label: 'Close',
            accelerator: 'Ctrl+W',
            click: () => this.mainWindow.close(),
          },
        ],
      },
      this.getViewMenu(),
      this.getHelpMenu(),
    ];
  }

  private getAppMenu(): DarwinMenuItemConstructorOptions {
    return {
      label: 'Electron',
      submenu: [
        {
          label: 'About ElectronReact',
          selector: 'orderFrontStandardAboutPanel:',
        },
        { type: 'separator' },
        { label: 'Services', submenu: [] },
        { type: 'separator' },
        {
          label: 'Hide ElectronReact',
          accelerator: 'Command+H',
          selector: 'hide:',
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:',
        },
        { label: 'Show All', selector: 'unhideAllApplications:' },
        { type: 'separator' },
        { label: 'Quit', accelerator: 'Command+Q', click: () => app.quit() },
      ],
    };
  }

  private getEditMenu(): DarwinMenuItemConstructorOptions {
    return {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'Cmd+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+Cmd+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'Cmd+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'Cmd+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'Cmd+V', selector: 'paste:' },
        { label: 'Select All', accelerator: 'Cmd+A', selector: 'selectAll:' },
      ],
    };
  }

  private getViewMenu(): MenuItemConstructorOptions {
    const submenu: MenuItemConstructorOptions[] = [
      {
        label: 'Toggle Full Screen',
        accelerator: process.platform === 'darwin' ? 'Ctrl+Cmd+F' : 'F11',
        click: () =>
          this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen()),
      },
    ];

    if (isDev) {
      submenu.unshift(
        {
          label: 'Reload',
          accelerator: process.platform === 'darwin' ? 'Cmd+R' : 'Ctrl+R',
          click: () => this.mainWindow.webContents.reload(),
        },
        {
          label: 'Toggle Developer Tools',
          accelerator:
            process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Ctrl+I',
          click: () => this.mainWindow.webContents.toggleDevTools(),
        }
      );
    }

    return {
      label: 'View',
      submenu,
    };
  }

  private getWindowMenu(): DarwinMenuItemConstructorOptions {
    return {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'Cmd+M',
          selector: 'performMiniaturize:',
        },
        { label: 'Close', accelerator: 'Cmd+W', selector: 'performClose:' },
        { type: 'separator' },
        { label: 'Bring All to Front', selector: 'arrangeInFront:' },
      ],
    };
  }

  private getHelpMenu(): MenuItemConstructorOptions {
    return {
      label: 'Help',
      submenu: [
        {
          label: 'Learn More',
          click: () => shell.openExternal('https://electronjs.org'),
        },
        {
          label: 'Documentation',
          click: () =>
            shell.openExternal(
              'https://github.com/electron/electron/tree/main/docs#readme'
            ),
        },
        {
          label: 'Community Discussions',
          click: () =>
            shell.openExternal('https://www.electronjs.org/community'),
        },
        {
          label: 'Search Issues',
          click: () =>
            shell.openExternal('https://github.com/electron/electron/issues'),
        },
      ],
    };
  }
}
