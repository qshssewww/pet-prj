import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from "./components/containers/header/Header";
import './global.css'
import Nav from "./components/containers/navigation/Nav";
import Main from "./components/containers/main/Main";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <div className={'wrapper'}>
        <Header/>
        <Nav/>
        <Main/>
    </div>
);


