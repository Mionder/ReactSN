import React, {Component} from "react";
import Product from "./Product";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class Shop extends Component {
    state = {
        products: [],
        isReady: false,
    }

    async componentDidMount() {
        const {products} = this.props;
        await this.setState({products, isReady: true})
        this.filterProducts();
    }

    filterProducts = () => {
        const {products} = this.state;
        let filtered = products.filter(item => item.status === "Approved")
        this.setState({products: filtered})
    }

    renderProducts = (arr) => {
        return arr.map((item, index) => {
            return (
                <Product key={index} product={item}/>
            )
        })
    }

    render() {
        const {products, isReady} = this.state;
        let shopProducts;
        if (isReady) {
            shopProducts = this.renderProducts(products);
        }
        return (
            <div className="shop">
                <div className="_container">
                    <div className="title-wrapper">
                        <p className="title">Small shop with all you need</p>
                        <Link to="/shop/create-product">
                            <button className="btn-shop">Create product</button>
                        </Link>
                    </div>
                    <div className="shop-wrapper">
                        <div className="filters-shop">

                        </div>
                        <div className="content-shop">
                            {shopProducts}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    products: state.products
}))(Shop)