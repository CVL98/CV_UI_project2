import './App.css';
import { BrowserRouter } from 'react-router-dom';

import React from 'react';
import Header from './components/header';
import { AppRouter } from './router/approuter';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
