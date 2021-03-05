import React, { useEffect, useState } from 'react';
import { useHttp } from '../../hooks/http.hook';

import './index.css';

export const ServerMessBlock = () => {
  const [tData, setTData] = useState(null);
  const [loadDataErr, setLoadDataErr] = useState(null);

  const { request } = useHttp();

  const [newCountryForm, setNewCountryForm] = useState({
    lang: '',
    name: '',
    photoLink: ''
  });
  const [saveDataRes, setSaveDataRes] = useState(null);
  const [saveDataErr, setSaveDataErr] = useState(null);

  useEffect(() => {
    request('/api/data/info', 'GET', null)
      .then(res => {
        setTData(res);
        setLoadDataErr(null);
      })
      .catch(e => {
        setTData(null);
        setLoadDataErr(e.message);
      });
  }, []);


  const changeLangFieldHandler = (event) => {
    setNewCountryForm({ ...newCountryForm, [event.target.name]: event.target.value });
  };


  const saveData = () => {
    setSaveDataErr(null);
    setSaveDataRes(null);

    request('/api/data/addCountry', 'POST', newCountryForm)
      .then((res) => {
        setSaveDataRes(res);
      })
      .catch((e) => {
        setSaveDataErr(e.msg);
      });
  };



  return (
    <div className="mainBlock">
      <img src="/images/logo192.png" alt="img"></img>
      <div>{tData ? tData : loadDataErr}</div>
      <div>
        <input
          placeholder="Введите язык"
          type="text"
          id="lang"
          onChange={changeLangFieldHandler}
        />
        <label className="active" htmlFor="lang">Язык</label>
      </div>
      <div>
        <input
          placeholder="Введите название страны"
          type="text"
          id="name"
          onChange={changeLangFieldHandler}
        />
        <label className="active" htmlFor="name">Название страны</label>
      </div>
      <div>
        <input
          placeholder="Введите ссылку на фото"
          type="text"
          id="photoLink"
          onChange={changeLangFieldHandler}
        />
        <label className="active" htmlFor="photoLink">Ссылка на фото</label>
      </div>
      <button
        onClick={saveData}
      >
        Сохранить
      </button>
      <div>{saveDataRes}</div>
      <div>{saveDataErr}</div>
    </div>
  )
};
