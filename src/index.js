import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Markdown from './markdown/Markdown';
import DrumMachine from './drum/DrumMachine';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
 } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>    
  <Router>
	  <Routes>
		  <Route path="/" element={<div><h1>Home</h1></div>}/>
		  <Route path="/markdown" element={<Markdown/>}/>
      <Route path="/drum" element={<DrumMachine/>}/>
	  </Routes>
</Router>
  </React.StrictMode>
);



