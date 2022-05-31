import React from 'react'
import PropTypes from 'prop-types'

class RemoveOneFromCartForm extends React.Component {

    static propTypes = {
      handle_removing: PropTypes.func.isRequired,
      product_id: PropTypes.number.isRequired,
    }

    state = {
        quantity: 1,
        product: this.props.product_id,
        user: localStorage.getItem('id'),
        cart: localStorage.getItem('id'),
        location: ''
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

    render(){
      return (
          <form onSubmit={e => this.props.handle_removing(e, this.state)}>
                <button
                    type="submit" 
                    className="btn btn-sm btn-danger btn-block"
                >-</button>
          </form> 
      )
    }
}

export default RemoveOneFromCartForm

