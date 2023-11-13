import React, { useEffect, useRef, useState } from 'react';
import './Detail.scss';
import 'react-datepicker/dist/react-datepicker.module.css';
import Chat from '../../components/Chat/Chat';
import Refund from '../../components/Refund/Refund';
import CalendarApp from '../../components/CalendarApp/CalendarApp';

const { kakao } = window;

const Detail = () => {
  const [people, setPeople] = useState(1);
  const container = useRef();

  const initMap = () => {
    const options = {
      center: new kakao.maps.LatLng(37.572662, 126.979295),
      level: 1,
    };
    const map = new kakao.maps.Map(container.current, options);
  };

  useEffect(() => {
    initMap();
  }, []);

  const addPeople = () => {
    setPeople(people + 1);
  };

  const subPeople = () => {
    if (people > 1) {
      setPeople(people - 1);
    }
  };

  return (
    <div className="detail">
      <div className="container">
        <div className="header">
          <div className="headerTitle">Class Page</div>
        </div>

        <div className="content">
          <img
            src="https://img.freepik.com/free-photo/top-view-arrangement-of-natural-material-stationery_23-2148898233.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699142400&semt=ais"
            alt="클래스 사진"
            className="classImage"
          />

          <div className="simpleDetail">
            <div className="classTitle">강의 1</div>
            <div className="classOpener">강의자</div>
            <div className="classCategory">강의 카테고리</div>
            <div className="classLocation">
              <div className="locationWriting">
                <div className="locationLabel">강의 위치</div>
                <button className="copyAddress">주소 복사</button>
              </div>
              <div className="map" id="map" ref={container} />
            </div>
            <div className="selectPeople">
              <button onClick={subPeople}>-</button>
              <div>{people}명</div>
              <button onClick={addPeople}>+</button>
            </div>
            <div className="buttons">
              <button className="addClass">강의 신청</button>
              <button className="addWish">찜</button>
            </div>
          </div>

          <div className="calendar">
            <div className="reserve">
              <CalendarApp />

              <div className="time">
                <button className="timeOption">
                  <div>08:00 ~ 12:00 (8/10명)</div>
                </button>

                <button className="timeOption">
                  <div>12:00 ~ 16:00 (5/10명)</div>
                </button>

                <button className="timeOption">
                  <div>16:00 ~ 20:00 (4/10명)</div>
                </button>

                <button className="timeOption">
                  <div>20:00 ~ 24:00 (마감)</div>
                </button>
              </div>
            </div>

            <div className="classPrice">가격</div>
          </div>
        </div>

        <div className="classDetail">상세 정보</div>

        <Refund />

        <Chat />
      </div>
    </div>
  );
};

export default Detail;
