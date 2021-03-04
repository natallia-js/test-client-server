import React, { useEffect, useState } from 'react';
import { useHttp } from '../../hooks/http.hook';

import './index.css';

export const ServerMessBlock = () => {
  const [tData, setTData] = useState(null);
  const [loadDataErr, setLoadDataErr] = useState(null);

  const { request } = useHttp();

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


  return (
    <div className="mainBlock">
      {tData ? tData : loadDataErr}
    </div>
  )
};
