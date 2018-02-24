import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, Route, Redirect } from 'react-router';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

import Login from './pages/Login';
import Base from './pages/Base';
import Configure from './pages/Configure';

import registerServiceWorker from './registerServiceWorker';

const HomePage = () => (<Base><Configure /></Base>);

const App = () => (
  <Router history={browserHistory}>
    <Route path="/" component={Login} />
    <Route path="/home" component={HomePage} />
    {/* <Redirect path="**" to="/" /> */}
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
