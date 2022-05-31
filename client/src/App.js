import React, { Component, Fragment } from 'react'
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom'

import './App.css'

import Nav from './layouts/Nav'
import Footer from './layouts/Footer'

import Cart from './actions/cart'
import LoginForm from './actions/login_form'
import SignupForm from './actions/signup_form'
import Products from './actions/products'
import SingleProduct from './actions/single_product'
import HomePage from './actions/home_page'
import Orders from './actions/orders'
import SingleOrderLine from './actions/single_order'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: '',
      id: '',
      hasError: false,
      errorInfo: ''
    }
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/api/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
      .then(res => res.json())
      .then(json => {
        this.setState({ username: json.username, id: json.id })
      })
    }
  }

  handle_login = (e, data) => {
    e.preventDefault()
    fetch('http://localhost:8000/api/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Something went wrong :(");
    })
    .then(json => {
      localStorage.setItem('token', json.token)
      localStorage.setItem('id', json.user.id)
      localStorage.setItem('username', json.user.username)
      this.setState({
        logged_in: true,
        displayed_form: '',
        username: json.user.username,
        id: json.user.id,
      })
      window.location.href = '/'    
    })
    .catch((error) => {
      this.setState({
        hasError: true,
        errorInfo: error.message
      })
    })
    
  }

  handle_signup = (e, data) => {
    e.preventDefault()
    fetch('http://localhost:8000/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Something went wrong :(');
    })
    .then(json => {
      localStorage.setItem('token', json.token)
      localStorage.setItem('id', json.id)
      localStorage.setItem('username', json.username)
      this.setState({
        logged_in: true,
        displayed_form: '',
        username: json.username,
        id: json.id,
      })
      window.location.href = '/'
    })
    .catch((error) => {
      console.dir(error)
    })
  }

  handle_logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('username')
    this.setState({ logged_in: false, username: '' , id: ''})
    window.location.href = '/'
  }

  display_form = (form) => {
    this.setState({
      displayed_form: form
    })
  }

  render() {

    let nonloggeduser = (
      <div>
        <Router>
          <Switch>
            <Route 
              exact path = '/login/' 
              render = {(props) => (<LoginForm handle_login={this.handle_login} hasError={this.state.hasError} errorInfo={this.state.errorInfo} />)}
            />
            <Route 
              exact path = '/signup/' 
              render = {(props) => (<SignupForm handle_signup={this.handle_signup} />)} 
            />
            <Route exact path ='/' component={Products} />
            <Route path='/product/:id/' component={SingleProduct} />
          </Switch>
        </Router>
        <br></br>
      </div>
    )    

    let loggeduser = (
      <div>
        <Router>
          <Switch>
            <Route exact path ='/' component={HomePage} />
            <Route path ='/catalogue/' component={Products} />
            <Route exact path ='/mycart/' component={Cart} />
            <Route path='/product/:id/' component={SingleProduct} />
            <Route exact path ='/myorders/' component={Orders} />
            <Route path ='/myorders/:id/' component={SingleOrderLine} />
          </Switch>
        </Router>
      </div>
    )

    let view

    this.state.logged_in ? view = loggeduser : view = nonloggeduser
     
    return (
      <Fragment>
        <Nav
          logged_in={this.state.logged_in}
          handle_logout={this.handle_logout}
        />
        <br></br>
        <div className="container">
          {view}
        </div>     
        <Footer />
      </Fragment>
    )
  }
}

export default App
