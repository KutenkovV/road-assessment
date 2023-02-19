import { useState } from 'react';
import '../logic';
import { useNavigate } from 'react-router-dom';
import { dataGet } from '../store/data';
import { useSelector, useDispatch } from 'react-redux';

function Main() {
  const navigate = useNavigate();

  const dataCount = useSelector((state) => state.data.value);
  const dispatch = useDispatch();


  const Submit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(dataGet());
    console.log(dataCount);
  }

  return (
    <>
      <div className="form__input">
        <p>Новая страничка</p>
        <div className="input-button">
          <button onClick={() => {navigate('/')}}>Изменить данные</button>
          <button onClick={Submit}>Получить данные</button>
        </div>
      </div>
    </>
  );
}

export default Main;
