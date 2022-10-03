import { observer } from 'mobx-react-lite';
import './Upload.css';
import './Table/Tabledata.css';
import Tabledata from './Table/Tabledata';
import { toJS } from 'mobx';
import { useState } from 'react';

const Upload = observer(() => {
  const [file, setfile] = useState('');

  // const store = useNagruzkaStore();
  // const navigate = useNavigate();

  // function onClick() {
  //   store.setConfig({
  //     ...toJS(store.config),
  //     file
  //   });
  //   store.loadSemesters();
  //   navigate('/main');
  // }
  const [items, setItems] = useState([]);

  async function selectFile(defaultPath: string, setFunc: any) {
    //открываем окно загрзуки
    const file = await window.electron.openFile({
      defaultPath,
      filters: [{ name: '*.xlsx', extensions: ['xlsx'] }],
    });
    let data = await window.electron.loadXls(file);
    console.log(data);
    setItems(data);
  }

  console.log('файл в стейте');
  console.log(file);


  return (
    <>
      <div className="upload-content">
        <p>Загрузите файл</p>
        <input
          type="text"
          value={file}
          onChange={(e) => setfile(e.target.value)}
        />
        <button type="button" onClick={() => selectFile(file, setfile)}>
          Загрузить
        </button>
      </div>
      <Tabledata data={items}/>
    </>
  );
});

export default Upload;
