import React, { useEffect, useState } from 'react';
import './Calculate.scss';
import MyPageEventHeader from '../../components/MyPageEventHeader/MyPageEventHeader';
import MyPageEventTab from '../../components/MyPageEventTab/MyPageEventTab';

const Calculate = () => {
  const [credit, setCredit] = useState();
  const [useCredit, setUseCredit] = useState(0);

  const setChangeUseCredit = (event) => {
    setUseCredit(event.target.value);
  };

  const getCredit = () => {
    fetch('http://34.64.172.211:8000/hosts', {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsIm5hbWUiOiLstZzrr7zsp4AiLCJlbWFpbCI6ImFsc3dsODE4NEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIwMTAtMTExMS05OTk5Iiwicm9sZSI6Imhvc3RzIiwiaWF0IjoxNzAwNTQ1NjgyLCJleHAiOjE3MDEyNjU2ODJ9.8V1tTOzgJOFcCdmBiiJGtIkE298k7BsQhUbk733D3pg',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCredit(data.hostInfoList[0].credit);
      });
  };

  useEffect(() => {
    getCredit();
  }, []);

  const completeCal = () => {
    fetch('http://34.64.172.211:8000/orders/adjust', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsIm5hbWUiOiLstZzrr7zsp4AiLCJlbWFpbCI6ImFsc3dsODE4NEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIwMTAtMTExMS05OTk5Iiwicm9sZSI6Imhvc3RzIiwiaWF0IjoxNzAwNTQ1NjgyLCJleHAiOjE3MDEyNjU2ODJ9.8V1tTOzgJOFcCdmBiiJGtIkE298k7BsQhUbk733D3pg',
      },
      body: JSON.stringify({
        amount: useCredit,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'ADJUST_COMPLETED') {
          alert('정산이 완료되었습니다.');
          getCredit();
          setUseCredit(0);
        }
      });
  };

  const numWithComma = (a) => {
    return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="calculate">
      <div className="container">
        <MyPageEventHeader />

        <div className="contents">
          <MyPageEventTab />
          <div className="content">
            <div className="mainLabel">정산</div>
            <div className="credit">
              <input
                type="text"
                value={useCredit}
                onChange={setChangeUseCredit}
              />
              <div>
                보유 크레딧 : {credit !== undefined ? numWithComma(credit) : 0}P
              </div>
              <div>수수료 20% 적용</div>
              <div>
                예상 정산가 :{' '}
                {useCredit === undefined ? 0 : numWithComma(useCredit * 0.8)}원
              </div>
              <button className="completeBtn" onClick={completeCal}>
                정산하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculate;
