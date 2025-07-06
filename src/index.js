import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './styles/layout.css';
import './styles/product.css';
import './styles/auth.css';
import './styles/animation.css';
import 'react-slideshow-image/dist/styles.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
