import './Upload.css';
import './Table/Tabledata.css';
import Tabledata from './Table/Tabledata';

function Upload() {
  return (
    <>
      <div className="upload-content">
        <p>Загрузите файл</p>
        <input type="file" />
      </div>
      <Tabledata />
    </>
  );
}

export default Upload;
