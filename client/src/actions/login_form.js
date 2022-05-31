import React, {Component, } from 'react'
import PropTypes from 'prop-types'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  }

  handle_change = e => {
    const name = e.target.name
    const value = e.target.value
    this.setState(prevstate => {
      const newState = { ...prevstate }
      newState[name] = value
      return newState
    })
  }


  render() {
    let error = this.props.hasError ? this.props.errorInfo : false;
    return (
        <div className="form-group">
          <form onSubmit={e => this.props.handle_login(e, this.state)}>
            <h4>Log In</h4>
            <p className="text-danger h4">{error}</p>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className ="form-control"
              value={this.state.username}
              onChange={this.handle_change}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className ="form-control"
              value={this.state.password}
              onChange={this.handle_change}
            />
            <br></br>
            <button 
              type="submit"
              className="btn btn-primary btn-lg btn-block"
            >
              Log In
            </button>  
          </form>
        </div>
    )
  }
}

export default LoginForm

LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired,
  hasError: PropTypes.bool.isRequired,
  errorInfo: PropTypes.string.isRequired
}