import React, {Component, Fragment } from 'react'
import {Link, } from 'react-router-dom'

class HomePage extends Component {

    state = {
        username: localStorage.getItem('username'),
    }
    
    render() { 
        return( 
        <Fragment>
            <h3> Welcome back, {this.state.username} </h3>
            <br></br>
            <br></br>
            <br></br>
            <div style={{"width":"1010px", "textAlign":"center"}}>
                <Link to = {{
                    pathname : `/mycart/`,
                }}>
                    <div className="products_gallery">
                        <div className="card text-white bg-primary mb-3" style={{'maxWidth': '250px','padding':'5px', 'height':'220px'}}>
                        <div className="card-body">
                            <h3 className="card-text">View Cart</h3>
                            <img src="https://img.icons8.com/carbon-copy/100/ffffff/shopping-cart.png" alt="error"/>
                        </div>
                        </div>  
                    </div>
                </Link> 
                <Link to = {{
                    pathname : `/myorders/`,
                }}>  
                    <div className="products_gallery">
                        <div className="card text-white bg-primary mb-3" style={{'maxWidth': '250px','padding':'5px', 'height':'220px'}}>
                        <div className="card-body">
                            <h3 className="card-text">View Past Orders</h3>
                            <img src="https://img.icons8.com/wired/64/ffffff/purchase-order.png" alt="error"/>
                        </div>
                        </div>  
                    </div>
                </Link>
                <Link to = {{
                    pathname : `/catalogue/`,
                }}>   
                    <div className="products_gallery">
                        <div className="card text-white bg-primary mb-3" style={{'maxWidth': '250px','padding':'5px', 'height':'220px'}}>
                        <div className="card-body">
                            <h3 className="card-text">View Catalogue</h3>
                            <img src="https://img.icons8.com/carbon-copy/100/ffffff/add-shopping-cart.png" alt="error"/>
                        </div>
                        </div>  
                    </div>
                </Link>    
                    <div className="products_gallery">
                        <div className="card text-white bg-secondary mb-3" style={{'maxWidth': '250px','padding':'5px', 'height':'220px'}}>
                        <div className="card-body">
                            <h3 className="card-text">Add Product</h3>
                            <h4 className="card-text">Coming soon</h4>
                            <img src="https://img.icons8.com/carbon-copy/100/ffffff/plus-math--v2.png" alt="error"/>
                        </div>
                        </div>  
                    </div>
            </div>
        </Fragment> 
        )
    } 
} 
  
export default HomePage