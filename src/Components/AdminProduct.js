import React from "react";
import "../assets/product.css";
export default function AdminProduct(props){
    const {title, price, currency, description, id, clicks, orders,  ownerId, status, img} = props.product;

    function postUpdate(statusNew){
        const product = {
            "title": title,
            "price": price,
            "currency": currency,
            "description": description,
            "status": statusNew,
            "ownerId": ownerId,
            "clicks": clicks,
            "img": img,
            "orders": orders,
        }

        const putMethod = {
            method: "PUT",
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(product)
        }

        fetch(`http://localhost:3000/products/${id}`, putMethod)
            .then(response => response.json())
            .then(data => {console.log(data); window.location.reload()})
            .catch(err => console.log(err))
    }

    return(
        <div className="admin-product">
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
            <div className="controls-post controls-product">
                {status}
                <button onClick={() => postUpdate("Rejected")} className="btn-post-admin">Reject</button>
                <button onClick={() => postUpdate("Approved")} className="btn-post-admin">Approve</button>
            </div>
        </div>

    )
}