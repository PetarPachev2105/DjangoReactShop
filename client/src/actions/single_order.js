import React, { Component , Fragment } from 'react'
import axios from 'axios'

class SingleOrderLine extends Component {

    state = {
        order_lines: [],
    }

    componentDidMount(){
        const id = this.props.match.params.id
        let data

        axios.get(`http://localhost:8000/api/order_lines/${id}/`, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }  
        })
        .then(res => { 
            data = res.data 
            this.setState({ 
                order_lines : data     
            }) 
        }) 
        .catch(err => {})
    }
    render(){
        return(
    <Fragment>
          <h2>Order Lines</h2>
          <br></br>
            <table className="table table-stripped">
                    <thead>
                        <tr className="table-primary">
                            <th>ID</th>
                            <th>Order ID</th>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>

                    <tbody>
                        { this.state.order_lines.map( order_lines => (  
                            <tr key={order_lines.id}>
                                <td>{order_lines.id}</td>
                                <td>{order_lines.order}</td>
                                <td>{order_lines.product}</td>
                                <td>{order_lines.product_name}</td>
                                <td>{order_lines.product_price.toFixed(2)}</td>
                                <td>{order_lines.quantity}</td> 
                            </tr>
                        ))
                        }
                    </tbody>
               </table>
      </Fragment>
        ) 
  } 
} 
  
export default SingleOrderLine