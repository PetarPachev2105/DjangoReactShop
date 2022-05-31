import React from 'react'
import PropTypes from 'prop-types'

class SignupForm extends React.Component {
  state = {
    username: '',
    password: ''
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
    return (
      <div className="container">
        <div className="form-group">
          <form onSubmit={e => this.props.handle_signup(e, this.state)}>
            <h4>Sign Up</h4>
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
            <button type="submit" className="btn btn-primary btn-lg btn-block">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default SignupForm

SignupForm.propTypes = {
  handle_signup: PropTypes.func.isRequired
}