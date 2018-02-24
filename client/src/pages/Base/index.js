import React, { Component } from 'react';
import { Sidebar, Segment } from 'semantic-ui-react';
import Side from './Side';
import Topbar from './Topbar';

const Base = (props) => (
  <div className="Base">
    <Sidebar.Pushable as={Segment}>
      <Side visible />

      <Sidebar.Pusher >
        <Topbar />
        <div className="Base-modules">
          {props.children}
        </div>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  </div>
);

export default Base;
