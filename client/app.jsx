import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router';
import {createBrowserHistory} from 'history';
import About from './components/about.jsx';
const newHistory = createBrowserHistory();

ReactDOM.render(<Router history={newHistory}>
  <Route path='/:productId' component={About} />
</Router>, document.getElementById('about'));