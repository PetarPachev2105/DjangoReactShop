import React, { Component , Fragment } from 'react'
import AddToCartForm from './add_to_cart'
import axios from 'axios'
import PropTypes from 'prop-types'

class SingleProduct extends Component {

    state = {
        product: [],
        logged_in: localStorage.getItem('token') ? true : false,
        user_id: localStorage.getItem('id'),
        cart_id: localStorage.getItem('id'),
        quantity: '',
        product_id: document.location.href.split('/')[4],
    }

    componentDidMount(){
        let data
        axios.get(`http://localhost:8000/api/products/${this.state.product_id}/`)       
        .then(res => { 
            data = res.data 
            this.setState({ 
                product : data     
            })
        }) 
        .catch(err => {})
    }


    handle_adding = (e, data) => {
        e.preventDefault()
        fetch(`http://localhost:8000/api/cart_entrys/${this.state.user_id}/add_to_cart/`, {
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
              quantity: json.quantity,
              product: parseInt(this.state.product.id),
            })
            window.location.href = '/mycart/'
        })
    }

    render() {
        let view

        this.state.logged_in 
        ? view = <AddToCartForm handle_adding = {this.handle_adding}/>
        : view = <h5>You like it? To purchase it you have to login first.</h5>
        
        return (
            <Fragment>
                <div className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-subtitle text-muted">Name:</h5>
                        <h4 className="card-title">{this.state.product.name}</h4>
                    </div>
                    <div className="card-body">
                        <img 
                            src={this.state.product.image}
                            width = '600px'
                            height = '500px'
                            alt="error">
                        </img>
                    </div>
                    <div className="card-body">
                        <h5 className="card-subtitle text-muted">Description:</h5>
                        <h4 className="card-text">{this.state.product.description}</h4>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Price: {this.state.product.price} </li>
                        <li className="list-group-item">Publish Date: {this.state.product.publish_date} </li>
                    </ul>
                    <div className="card-body">
                        {view}
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default SingleProduct

SingleProduct.propTypes = {
    product_id: PropTypes.any
  }