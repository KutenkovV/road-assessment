import { Channels } from 'main/preload';
import { AssessmentCellType } from '../types';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: Channels, args: unknown[]): void;
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
      };
      openFile(options: any): any;
      loadXls(filename: string): Promise<Array<AssessmentCellType>>;
    };
  }
}

export {};
