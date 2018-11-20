// reset.css
import 'ress/ress.css';
import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';

import './bootstrap';
import Button from './components/atoms/button';
// import { Provider } from 'react-redux';
// import store from './store';

const root = document.getElementById('root');
render(
  <div>
    <Button label="button" />
  </div>,
  root
);
