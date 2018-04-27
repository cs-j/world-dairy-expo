import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './reducer.js';

const store = createStore(rootReducer)
// console.log('store is', store)
// console.log('state is', store.getState())

ReactDOM.render(
  <Provider store={store} >
    <App store={store} />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
