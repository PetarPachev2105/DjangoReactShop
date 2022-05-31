import React, {Component, } from 'react'
import axios from 'axios'
import { Fragment } from 'react'
import Purchase from './purchase'
import CartClear from './cart_clear'
import RemoveOneFromCartForm from './remove_from_cart'
import AddOneToCartForm from './add_one_to_cart'
import RemoveCartEntryForm from './remove_cart_entry'

class Cart extends Component { 
  
    state = { 
        cart : [],
        cart_entrys: [],
        logged_in: localStorage.getItem('token') ? true : false,
        user_id: localStorage.getItem('id')
    }
  
    componentDidMount() { 
        let cart_data
        let cart_entry_data
        axios
        .get(`http://localhost:8000/api/carts/${this.state.user_id}/`, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }    
        })
        .then(res => { 
            cart_data = res.data
            this.setState({ 
                cart : cart_data     
            })
        }) 
        .catch(err => {})

        axios
        .get(`http://localhost:8000/api/cart_entrys/${this.state.user_id}/`, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }    
        })
        .then(res => { 
            cart_entry_data = res.data 
            this.setState({ 
                cart_entrys : cart_entry_data     
            })
        }) 
        .catch(err => {})            
    }
    
    handle_purchasing = (e, data) => {
        e.preventDefault()
        fetch(`http://localhost:8000/api/carts/${this.state.user_id}/purchase/`, {
            method: 'POST',
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            })
        .then(res => res.json())
        .then(() => {
            window.location.href="/myorders/"
         });
    }

    handle_cart_clearing = (e, data) => {
        e.preventDefault()
        fetch(`http://localhost:8000/api/carts/${this.state.user_id}/clear_cart/`, {
            method: 'POST',
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((res) => { 
            if (res.ok) {
                return res.json();
            }
            throw new Error('Something went wrong');
        })
        .then(() => {
           window.location.reload();
        });
    }

    handle_removing = (e, data) => {
        e.preventDefault()
        fetch(`http://localhost:8000/api/cart_entrys/${this.state.user_id}/remove_one_from_cart/`, {
            method: 'POST',
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error('Something went wrong');
        })
        .then(json => {
            this.setState({
                quantity: 1,
                product: ''
            })
        })
        .then(() => {
            window.location.reload();
         });
    }

    handle_removing_cart_entry = (e, data) => {
        e.preventDefault()
        fetch(`http://localhost:8000/api/cart_entrys/${this.state.user_id}/remove_cart_entry/`, {
            method: 'POST',
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error('Something went wrong');
        })
        .then(json => {
            this.setState({
                quantity: 1,
                product: ''
            })
        })
        .then(() => {
            window.location.reload();
         });
    }

    handle_adding = (e, data) => {
        e.preventDefault()
        fetch(`http://localhost:8000/api/cart_entrys/${this.state.user_id}/add_one_to_cart/`, {
            method: 'POST',
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error('Something went wrong');
        })
        .then(json => {
            this.setState({
                quantity: 1,
                product: ''
            })
        })
        .then(() => {
            window.location.reload();
        })
    }

  render(){
    let cart
    cart = (
        <div>
            <table className="table table-stripped">
                <thead>
                    <tr className="table-primary">
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Quantity</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { this.state.cart_entrys.map( cart_entrys => (  
                        <tr key={cart_entrys.id}>
                            <td>{cart_entrys.id}</td>
                            <td>{cart_entrys.product_name}</td>
                            <td>{cart_entrys.product_price}</td>
                            <td>{cart_entrys.quantity}</td> 
                            <td>  
                                <RemoveOneFromCartForm 
                                    handle_removing={this.handle_removing}
                                    product_id = {cart_entrys.product}
                                />
                            </td>
                            <td>
                                <AddOneToCartForm 
                                    handle_adding={this.handle_adding}
                                    product_id = {cart_entrys.product}
                                /> 
                            </td>
                            <td>
                            <RemoveCartEntryForm 
                                    handle_removing_cart_entry={this.handle_removing_cart_entry}
                                    product_id = {cart_entrys.product}
                                />
                            </td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
            <br></br>
            <div style={{"textAlign":"right"}}>
                <h4>Total: {this.state.cart.total}</h4>         
            </div>
            <div>
                <Purchase handle_purchasing={this.handle_purchasing}/>
                <br></br>
                <CartClear handle_cart_clearing={this.handle_cart_clearing}/>         
            </div>
        </div>
    )

    let emptycart
    emptycart = (
        <div>
            <h3>Your cart is empty</h3> 
        </div>
    )

    let view
    if (Object.keys(this.state.cart_entrys).length === 0) {
        view = emptycart
    }else{
        view = cart 
    }

    return( 
        <Fragment>
            <div> 
                <h3>My Cart</h3>
                <br></br>    
                <div className="container">
                    {view}       
                </div>
            </div>
        </Fragment>
    )
  } 
} 
  
export default Cart

