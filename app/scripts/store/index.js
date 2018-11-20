import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { createLogger } from 'redux-logger';
import reducer from '../reducers';

const initialState = {};
const enhancers = [];
const middleware = [thunk, promiseMiddleware];

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });
  middleware.push(logger);
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(reducer, initialState, composedEnhancers);
export default store;
