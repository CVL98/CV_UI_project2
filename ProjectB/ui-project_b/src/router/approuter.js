import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/home';
import Musicalbums from '../pages/musicalbums';
import GroupDetails from '../pages/groupdetails';
import EditGroupPage from '../pages/edit'; // Import the EditGroupPage component

export function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/music' element={<Musicalbums />} />
      <Route path='/music/details/:musicGroupId' element={<GroupDetails />} />
      <Route path='//edit/:musicGroupId' element={<EditGroupPage />} />
    </Routes>
  );
}
