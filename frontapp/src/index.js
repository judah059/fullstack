import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app.js';
import {BrowserRouter} from "react-router-dom";
import Popup from "reactjs-popup";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);
