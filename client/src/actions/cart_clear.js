import React, {Component, } from 'react'
import PropTypes from 'prop-types'

class CartClear extends Component {

    state = {
        user: localStorage.getItem('id'),
    }

    render() {
      return (
        <div>
          <form onSubmit={e => this.props.handle_cart_clearing(e, this.state)}>
                  <button
                      type="submit" 
                      className="btn btn-danger"
                  >Clear Cart</button>
          </form>
        </div>
      )
    }
}

export default CartClear

CartClear.propTypes = {
    handle_cart_clearing: PropTypes.func.isRequired
}