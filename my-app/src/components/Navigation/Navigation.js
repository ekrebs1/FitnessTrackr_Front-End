import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";

import "./Navigation.css";

const Navigation = ({ auth, setAuth }) => {
  function handleLogout() {
    localStorage.removeItem("token");
    setAuth(false);
  }
  return (
    <AppBar position='static'>
      <Toolbar className='NavBar'>
        <div className='Nav-Links'>
          <Link className='Nav-Link' to='/home'>
            Fitness Trackr
          </Link>
          <Link className='Nav-Link' to='/routines'>
            Routines
          </Link>
          {auth && (
            <Link className='Nav-Link' to='/my-routines'>
              My Routines
            </Link>
          )}
          <Link className='Nav-Link' to='/activities'>
            Activites
          </Link>
        </div>
        <div className='User-Links'>
          {auth ? (
            <Link
              id='Login-Link'
              className='Nav-Link'
              to='/login'
              onClick={handleLogout}>
              Logout
            </Link>
          ) : (
            <>
              <Link id='Login-Link' className='Nav-Link' to='/login'>
                Login
              </Link>
              <Link id='Register-Link' className='Nav-Link' to='/register'>
                Register
              </Link>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
