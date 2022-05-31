import React, {Component, Fragment,  } from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'

class Orders extends Component { 
  
    state = { 
        orders : [],
        user_id: localStorage.getItem('id')
    } 

    componentDidMount() { 
        let data  
        axios
        .get(`http://localhost:8000/api/orders/${this.state.user_id}/`, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }    
        })       
        .then(res => { 
            data = res.data 
            this.setState({ 
                orders : data     
            })
        }) 
        .catch(err => {}) 
    } 
  
    render () {

        let no_orders

        no_orders = (
            <h3>You don't have orders</h3>
        )

        let orders
        orders = (
            <div>
                <table className="table table-stripped">
                    <thead>
                        <tr className="table-primary">
                            <th>ID</th>
                            <th>Total</th>
                            <th>See Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.orders.map( orders => (
                            <tr key={orders.id}>
                                <td>{orders.id}</td>
                                <td>{orders.total}</td>
                                <td>
                                    <NavLink to={`/myorders/${orders.id}/`}>
                                        <button 
                                            type="button" 
                                            className="btn btn-info"
                                        >View</button>
                                    </NavLink>        
                                </td> 
                            </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )

        let view
        if (Object.keys(this.state.orders).length === 0) {
            view = no_orders
        }else{
            view = orders 
        }

        return(
            <Fragment>
                <h2>Orders</h2>
                <br></br>
                {view}  
            </Fragment> 
        )
    } 
} 
  
export default Orders