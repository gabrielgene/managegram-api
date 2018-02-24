import React from 'react';
import Topbar from '../../components/Topbar';
import './style.css';

const Base = (props) => (
  <div className="Base">
    <Topbar />
    <div className="Base-modules">
      {props.children}
    </div>
  </div>
);

export default Base;
