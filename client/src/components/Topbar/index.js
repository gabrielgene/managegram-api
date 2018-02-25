import React from 'react';
import { Feed } from 'semantic-ui-react';
import './style.css';

const Topbar = (props) => (
  <div className="Topbar">
    <div className="Topbar-content">
      <h1 className="Topbar-content-title">ManageGram</h1>
      <div className="Topbar-content-title-wrapper">
        <h1 className="Topbar-content-user">{props.userName}</h1>
        <div className="Topbar-content-user-feed">
          <div className="Topbar-content-user-feed-word">
            {props.userName.charAt(0).toUpperCase()}
          </div>
        </div>
        <h1>
        </h1>
      </div>
    </div>
  </div>
);

export default Topbar;
