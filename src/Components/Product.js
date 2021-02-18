import React from "react";
import "../assets/product.css";
export default function Product(props){
    const {title, price, currency, description, ownerId, img} = props.product;

    return(
        <div className="product">
            <div className="product-img">
                <img src={img} alt="no-product-img"/>
            </div>
            <div className="product-info">
                <p className="product-title">{title}</p>
                <p className="product-label">{description}</p>
                <p className="product-label price-product">Price: {price}{currency}</p>
                <button className="btn-shop">Shop now</button>
            </div>

        </div>
    )
}