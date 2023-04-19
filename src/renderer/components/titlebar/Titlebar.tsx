import './Titlebar.css';

function Titlebar() {

  // Да, это выглядит по тупому :С
  function CloseBtn() {
    window.electron.closeApp();
  }

  function MaximizeBtn() {
    window.electron.maximizeApp();
  }

  function MinimizeBtn() {
    window.electron.minimizeApp();
  }

  return (
    <>
      <div className="titlebar">
        <div className="titlebar__icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M256 32H181.2c-27.1 0-51.3 17.1-60.3 42.6L3.1 407.2C1.1 413 0 419.2 0 425.4C0 455.5 24.5 480 54.6 480H256V416c0-17.7 14.3-32 32-32s32 14.3 32 32v64H521.4c30.2 0 54.6-24.5 54.6-54.6c0-6.2-1.1-12.4-3.1-18.2L455.1 74.6C446 49.1 421.9 32 394.8 32H320V96c0 17.7-14.3 32-32 32s-32-14.3-32-32V32zm64 192v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V224c0-17.7 14.3-32 32-32s32 14.3 32 32z" /></svg>
          <p>Оценка и прогнозирование состояния дорожного покрытия</p>
        </div>
        <div className="titlebar__controls">
          <span onClick={MinimizeBtn} className="titlebar__controls-maximize" />
          <span onClick={MaximizeBtn} className="titlebar__controls-minimize" />
          <span onClick={CloseBtn} className="titlebar__controls-close" />
        </div>
      </div>
    </>
  );
}

export default Titlebar;
