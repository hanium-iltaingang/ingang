// index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // 'react-dom/client'에서 createRoot를 가져옵니다.
import './App.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
