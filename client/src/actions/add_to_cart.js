import React, {Component} from 'react'
import PropTypes from 'prop-types'

class AddToCartForm extends Component {
    state = {
        quantity: '',
        user: localStorage.getItem('id'),
        product: document.location.href.split('/')[4],
        cart: localStorage.getItem('id'),
        location: '',
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
        <div className="form-group">
            <form onSubmit={e => this.props.handle_adding(e, this.state)}>
                <h4>Add To Cart</h4>
                <label htmlFor="quantity">Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    className ="form-control"
                    value={this.state.quantity}
                    onChange={this.handle_change}
                />
                <br></br>
                <button 
                    type="submit" 
                    className="btn btn-primary btn-lg btn-block"
                >
                  Add
                </button>
            </form>
            <br></br>
        </div>
    )
  }
}

export default AddToCartForm

AddToCartForm.propTypes = {
  handle_adding: PropTypes.func.isRequired
}