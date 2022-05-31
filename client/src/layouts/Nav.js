import React from 'react';
import PropTypes from 'prop-types';

function Nav(props) {

  const logged_out_nav = (
    <div className ="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav mr-auto">
        <li className ="nav-item">
          <a className ="nav-link" href="/">Catalogue</a>
        </li>
      </ul>  
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className ="nav-link" href="/login/">Login</a>
        </li>
        <li className="nav-item">
          <a className ="nav-link" href="/signup/">Sign Up</a>
        </li>
      </ul>
    </div>
  )

  const logged_in_nav = (
    <div className ="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav mr-auto">
        <li className ="nav-item">
          <a className ="nav-link" href="/">Home</a>
        </li>
        <li className ="nav-item">
          <a className ="nav-link" href="/catalogue/">Catalogue</a>
        </li>
      </ul>
      <ul className ="navbar-nav ml-auto">
        <li className ="nav-item">
          <a className ="nav-link" href="/mycart/">My Cart</a>
        </li>
        <li className ="nav-item">
          <a className ="nav-link" href="/myorders/">My Orders</a>
        </li>
        <li className="nav-item" onClick={props.handle_logout}>
          <a className ="nav-link" href='/'>Logout</a>
        </li>
      </ul>
    </div>
  )

  return (
    <nav className = "navbar navbar-expand-lg navbar-dark bg-primary">
      <a className ="navbar-brand" href="/">Shop</a>
      <button className ="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span className ="navbar-toggler-icon"></span>
      </button>
      <div className ="collapse navbar-collapse" id="navbarColor01">
        {props.logged_in ? logged_in_nav : logged_out_nav}
      </div>
    </nav>
  )
}

export default Nav

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  handle_logout: PropTypes.func.isRequired
}