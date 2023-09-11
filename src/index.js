import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App.js';
import request from './api/request.js'
React.$http = request
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
