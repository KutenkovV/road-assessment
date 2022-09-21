import {observer} from "mobx-react-lite";
import './Upload.css';
import './Table/Tabledata.css';
import Tabledata from './Table/Tabledata';
import { useState } from 'react';

const Upload = observer(() => {
  const [file, setfile] = useState("");

  async function selectFile(defaultPath: string, setFunc: any) {
    const file = await window.electron.openFile({
      defaultPath,
      filters: [{ name: '*.xlsx', extensions: ['xlsx'] }],
    });
    if (file) {
      setFunc(file);
    }
  }

  console.log('файл в стейте');
  console.log(file);

  return (
    <>
      <div className="upload-content">
        <p>Загрузите файл</p>
        <input
          type="file"
          value={file}
          onChange={(e) => setfile(e.target.value)}
        />
        <button type="button" onClick={() => selectFile(file, setfile)}>
          Загрузить
        </button>
      </div>
      <Tabledata />
    </>
  );
})

export default Upload;
