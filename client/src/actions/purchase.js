import React, {Component, } from 'react'
import PropTypes from 'prop-types'

class Purchase extends Component {

    state = {
        user: localStorage.getItem('id'),
    }

    render() {

      return (
        <div>
          <form onSubmit={e => this.props.handle_purchasing(e, this.state)}>
                  <button
                      type="submit" 
                      className="btn btn-primary"
                  >Purchase</button>
          </form>
        </div>
      )
    }
}

export default Purchase

Purchase.propTypes = {
    handle_purchasing: PropTypes.func.isRequired
}