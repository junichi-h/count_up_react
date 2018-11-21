// reset.css
import 'ress/ress.css';
import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import './bootstrap';
import store from './store';
import App from './components/app';

const root = document.getElementById('root');
render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
