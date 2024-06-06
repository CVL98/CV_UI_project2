import React from 'react';
import {Routes, Route } from "react-router-dom";

import Home from '../pages/home';
import {Musicalbums} from '../pages/musicalbums';
import GroupDetails from '../pages/groupdetails';


export function AppRouter() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/music' element={<Musicalbums/>}></Route>
        <Route path='/music/details/:musicGroupId' element={<GroupDetails />} />
    </Routes>
  )
}
