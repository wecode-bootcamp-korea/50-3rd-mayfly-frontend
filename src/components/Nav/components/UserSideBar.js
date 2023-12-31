import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserSideBar.scss';

const UserSideBar = ({ credit }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const SIDE_BAR = {
    users: (
      <div className="sideBar">
        <ul className="userMenu">
          <li
            className="menu"
            onClick={() => {
              navigate('/my-page-user');
            }}
          >
            MY PAGE
          </li>
          <li className="myCredit">
            보유 크레딧 : {credit.toLocaleString('ko-KR') + ' C'}
          </li>
          <li
            className="menu"
            onClick={() => {
              navigate('/credit');
            }}
          >
            충전하기
          </li>
        </ul>
      </div>
    ),
    hosts: (
      <div className="evenUser">
        <ul className="eventUserMenu">
          <li
            className="menu"
            onClick={() => {
              navigate('/my-page-event');
            }}
          >
            MY PAGE
          </li>
          <li className="myCredit">
            보유 크레딧 : {credit.toLocaleString('ko-KR') + ' C'}
          </li>
          <li
            className="menu"
            onClick={() => {
              navigate('/my-page-event-calculate');
            }}
          >
            정산하기
          </li>
        </ul>
      </div>
    ),
  };

  return <div className="box">{SIDE_BAR[role]}</div>;
};

export default UserSideBar;
