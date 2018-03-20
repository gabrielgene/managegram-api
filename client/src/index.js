import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, Route } from 'react-router';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

import Login from './pages/Login';
import Home from './pages/Home';
import Admin from './pages/Admin';

import registerServiceWorker from './registerServiceWorker';

const App = () => (
  <Router history={browserHistory}>
    <Route path="/" component={Login} />
    <Route path="/home" component={Home} />
    <Route path="/admin" component={Admin} />
    {/* <Redirect path="**" to="/" /> */}
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
