import React from "react";
import { Route } from "react-router-dom";
import Home from "../Home.js";
import Login from "../Login/Login.js";
import Register from "../Register/Register.js";
import Routines from "../Routines/Routines";
import Activities from "../Activities/Activities.js";
import MyRoutines from "../MyRoutines/MyRoutines.js";
const Pages = ({ auth, setAuth }) => {
  return (
    <>
      <Route exact path='/home'>
        <Home />
      </Route>
      <Route exact path='/routines'>
        <Routines auth={auth} />
      </Route>
      <Route exact path='/my-routines'>
        <MyRoutines />
      </Route>
      <Route exact path='/activities'>
        <Activities auth={auth} />
      </Route>
      <Route exact path='/login'>
        <Login setAuth={setAuth} />
      </Route>
      <Route exact path='/register'>
        <Register setAuth={setAuth} />
      </Route>
    </>
  );
};
export default Pages;
