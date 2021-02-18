import React, {Component} from "react";
import {connect} from "react-redux";
import {saveUsers, loadPosts, loadProducts, loadCategories} from "../actions/actionCreator";

class ServiceLoadData extends Component{

    componentDidMount() {
        this.saveUser();
    }

    saveUser = async () => {
        const {saveUsers, loadPosts, loadProducts, loadCategories, dataIsReady} = this.props;
        await fetch("http://localhost:3000/users")
            .then((res)=>{
                return res.json()
            })
            .then(async(data)=>{
                data.forEach(item => {
                    const {id, login, password, email} = item;
                    saveUsers(id,login,password,email);
                })
                console.log(data);
                // await this.setState({users: data})
            })
            .catch((err)=>{
                console.log(err)
            })

        await fetch("http://localhost:3000/posts")
            .then((res)=>{
                return res.json()
            })
            .then(async(data)=>{
                data.forEach(item => {
                    const {name, date, info, id, status, category, clicks, ownerId} = item;
                    loadPosts(name, date, info, id, status, category, clicks, ownerId);
                })
                console.log(data);
                // await this.setState({users: data})
            })
            .catch((err)=>{
                console.log(err)
            })

        await fetch("http://localhost:3000/products")
            .then((res)=>{
                return res.json()
            })
            .then(async(data)=>{
                data.forEach(item => {
                    const {title, price, currency, description, status, ownerId, clicks, img, orders, id} = item;
                    loadProducts(title, price, currency, description, status, ownerId, clicks, img, orders, id);
                })
                console.log(data);
                // await this.setState({users: data})
            })
            .catch((err)=>{
                console.log(err)
            })

        await fetch("http://localhost:3000/categotiesPosts")
            .then((res)=>{
                return res.json()
            })
            .then(async(data)=>{
                data.forEach(item => {
                    loadCategories(item);
                })
                console.log(data);
                // await this.setState({users: data})
            })
            .catch((err)=>{
                console.log(err)
            })

        await dataIsReady(true);

    }

    render() {
        return(
            <div>

            </div>
        )
    }
}
export default connect(state => ({
    users: state.users
}),{saveUsers, loadPosts, loadProducts, loadCategories})(ServiceLoadData)