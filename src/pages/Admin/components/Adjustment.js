import React, { useEffect, useState } from 'react';

const Adjustment = () => {
  const [charge, setCharge] = useState(20.0);
  const [num, setNum] = useState(0);
  const [hostCreditList, setHostCreditList] = useState([]);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWRtaW5faWQiOiJhZG1pbjExMDgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTk5NTU1MDB9.MjN3UL4Ie0qnk2owFiqy0cONldqVNtbjFjZj9zJK6Ig';
  // const token = localStorage.getItem('token')

  useEffect(() => {
    fetch('http://10.58.52.195:8000/admins/hosts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setHostCreditList(data.adminHostInfoList.map((i) => i.credit));
      });
  }, []);

  const handleClick = () => {
    setCharge(num);
    setNum(0);
  };

  return (
    <div className="Adjustment">
      <div>
        <h1>현재 수수료 : {charge} %</h1>
        <input
          placeholder="변경할 수수료율"
          type="number"
          value={num}
          onChange={(e) => setNum(e.target.value)}
        />
        <button onClick={handleClick}>변경</button>
      </div>
      <div>
        <span>현재 정산 대기중인 금액 : </span>
        {String(hostCreditList.reduce((acc, v) => acc + v, 0)).replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ',',
        )}
        <span> 크레딧</span>
      </div>
    </div>
  );
};

export default Adjustment;