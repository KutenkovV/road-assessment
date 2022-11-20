import './Titlebar.css';

function Titlebar() {
  return (
    <>
      <div className="titlebar">
        <div className="titlebar__icon">
            <p>Оценка и прогнозирование дорожного покрытия</p>
        </div>
        <div className="titlebar__controls">
          <span className="titlebar__controls-maximize" />
          <span className="titlebar__controls-minimize" />
          <span className="titlebar__controls-close" />
        </div>
      </div>
    </>
  );
}

export default Titlebar;
