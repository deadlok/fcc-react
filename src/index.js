import React from 'react';
import ReactDOM from 'react-dom/client';
import { lazy } from 'react';
import './index.css';
//import Markdown from './markdown/Markdown';
//import DrumMachine from './drum/DrumMachine';
//import Calculator from './calculator/Calculator';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
 } from "react-router-dom";

 const Markdown = lazy(() => import('./markdown/Markdown'));
 const DrumMachine = lazy(() => import('./drum/DrumMachine'));
 const Calculator =  lazy(() => import('./calculator/Calculator'));
 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>    
  <Router>
	  <Routes>
		  <Route path="/" element={<div><h1>Home</h1></div>}/>
		  <Route path="/markdown" element={<Markdown/>}/>
      <Route path="/drum" element={<DrumMachine/>}/>
      <Route path="/calculator" element={<Calculator/>}/>
	  </Routes>
</Router>
  </React.StrictMode>
);



