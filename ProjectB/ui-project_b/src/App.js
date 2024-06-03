import logo from './logo.svg';
// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css';
import React from 'react';
import { NavScrollExample } from './components/BootstrapNav';
import { ListMusicGroups } from './components/ListAlbums';

function App() {
  return (
    <>
    <ListMusicGroups/>
  </>

    
  );
}

export default App;
