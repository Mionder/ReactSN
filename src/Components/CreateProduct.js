import React, {Component} from "react";
import "../assets/createProduct.css";
import { Alert, AlertTitle } from '@material-ui/lab';

export default class CreateProduct extends Component{
    state = {
        title: "",
        price: 0,
        currency: "",
        description: "",
        img: "",
        isError: false,
        errorMessage: "",
    }

    createProduct = () => {
        const {title, price, currency, description, img} = this.state;
        console.log(this.state);
        let localError = false;
        for(let key in this.state){
            if(!this.state[key]){
             localError = true;
            }
        }
        let idUser = localStorage.getItem("userId");
        if(!localError) {
            const product = {
                "title": title,
                "price": price,
                "currency": currency,
                "description": description,
                "status": "Not Approved",
                "ownerId": idUser,
                "clicks": 0,
                "img": img,
                "orders": 0,
            }
            fetch("http://localhost:3000/products",
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(product)
                })
                .then(function (res) {
                    console.log(res);
                    window.location.href = window.location.origin + "/shop";
                })
                .catch(error => console.log(error))
        }
        else{
            this.setState({isError: true, errorMessage: "Enter all fields"})
        }
    }

    render() {
        const {isError, errorMessage} = this.state;
        return(
            <div className="create-product">
                <div className="_container">
                    <div className="create-product-wrapper">
                        <p className="title">Create your product</p>
                        <div className="create-product-form">
                            <input  onChange={(e)=>this.setState({title:e.target.value})} type="text" placeholder="Enter the title of product" className="product-input"/>
                            <input  onChange={(e)=>this.setState({price:e.target.value})} type="number" placeholder="Enter price" className="product-input"/>
                            <select onChange={(e)=>this.setState({currency:e.target.value})} className="product-input" name="currency" id="currency">
                                <option selected disabled value="">Select currency</option>
                                <option value="$">$</option>
                                <option value="€">€</option>
                            </select>
                            <textarea onChange={(e)=>this.setState({description:e.target.value})} type="text" placeholder="Enter description of product" className="product-input product-textarea"/>
                            <input  onChange={(e)=>this.setState({img:e.target.value})} type="text" placeholder="Enter link to the image of product" className="product-input"/>
                            <button onClick={this.createProduct} className="btn-shop">Create</button>
                        </div>
                        {
                            isError &&
                            <div className="error-block">
                                <Alert severity="error">
                                    <AlertTitle>Error - {errorMessage}</AlertTitle>
                                </Alert>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}