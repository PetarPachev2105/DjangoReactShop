import React, {Component, Fragment,  } from 'react'
import {Link, } from 'react-router-dom'
import axios from 'axios'

class Products extends Component { 
  
    state = {
        products : [],
        links: ''
    } 
  
    componentDidMount() {
        this.loadProducts('http://localhost:8000/api/products/')
    }

    loadProducts = async (url) => {
        await axios.get(url)
            .then((res) => {
                console.log(res.data);
                const products = res.data.results
                this.setState({
                    products,
                    links: res.data
                })

            })
    }

    prevPage = () => {
        let toPage = this.state.links.previous
        this.loadProducts(toPage);
    }

    nextPage = () => {
        let toPage = this.state.links.next
        this.loadProducts(toPage);
    }
  
    render() {
        const { links } = this.state

        return( 
            <Fragment>    
                <h2>Catalogue</h2>
                <br></br>
                <center>
                <div style={{"width":"1010px", "textAlign":"center"}}>
                    { this.state.products.map( products => (
                        <div key={products.id}>
                            <div className="products_gallery">
                            <Link to = {{
                                pathname : `/product/${products.id}/`,
                            }}>
                                <div className="card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">{products.name}</h5>
                                </div>
                                <img 
                                    src={products.image}
                                    width = '100%'
                                    height = '150px'
                                    alt="error">
                                </img>
                                <div className="card-body">
                                    <p className="card-text">Description: {products.description}</p>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Price: {products.price}</li>
                                </ul>
                                <div className="card-footer text-muted">
                                    {products.publish_date}
                                </div>
                                </div> 
                            </Link>

                            </div>
                        </div>     
                        ))
                    }
                </div> 
                </center>
                <button 
                            type="button" 
                            className="btn btn-primary"
                            disabled={links.previous === null} 
                            onClick={this.prevPage}
                    >Prev</button>
                    <button 
                        type="button" 
                        className="btn btn-primary"
                        disabled={links.next === null} 
                        onClick={this.nextPage}
                    >Next</button>
                <br></br>
            </Fragment>
        )
  } 
} 
  
export default Products