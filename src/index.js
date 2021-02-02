//react
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';

//router
import { BrowserRouter } from 'react-router-dom';
import App from './App';

//redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducer/globalReducer';
import thunk from 'redux-thunk';

//Store
const storeRedux = createStore(rootReducer, applyMiddleware(thunk));

const app = (
  <Provider store={storeRedux}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
reportWebVitals();
