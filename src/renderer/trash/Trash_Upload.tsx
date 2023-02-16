import { useState } from 'react';
import Tabledata from '../components/Table/Tabledata';

function Upload() {
  const [items, setItems] = useState<any>([]);

  async function selectFile(defaultPath: string) {
    const file = await window.electron.openFile({ defaultPath });
    let data = await window.electron.loadXls(file);
    console.log(data);
    setItems(data);
  }

  return (
    <>
      <div className="form-input">
        <label>Выберите файл для загрузки</label>
        <input type="file" onChange={(e) => selectFile(e.target.value)} />
      </div>
      <Tabledata data={items} />
    </>
  );
}

export default Upload;
