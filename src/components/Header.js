import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

 const Header = () => (
 
        <h1>MERN STACK NOTES APP</h1>
    
);

/*    <button className="button button--link" onClick={startLogout}>Logout</button> */
/*
const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header); */

export default Header;