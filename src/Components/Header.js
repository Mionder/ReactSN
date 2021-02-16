import React, {Component} from "react";
import "../assets/header.css";
import {Link} from "react-router-dom";
export default class Header extends Component{
    state = {
        username: "",
        id: "",
        fullUser: {}
    }
    async componentDidMount() {
        await this.setState({
            username: localStorage.getItem("username"),
            id: localStorage.getItem("userId")
        })
        let id = localStorage.getItem("userId");
        fetch(`http://localhost:3000/users/${id}`)
            .then((res)=>{
                return res.json()
            })
            .then(async(data)=>{
                await this.setState({fullUser: data});
            })
            .catch(error => console.log(error))
    }

    render() {
        const {username, fullUser} = this.state;
        return(
            <header className="header">
                <div className="_container">
                    <nav className="header-nav">
                        <ul className="header-list">
                            <li className="header-item"><Link to="/">Home</Link></li>
                            <li className="header-item"><Link to="/create-post">Create Post</Link></li>
                            <li className="header-item">Shop</li>
                            <li className="header-item">{username ? `Hello, ${username}`  : <Link to="/login">Sign in</Link>}</li>
                            <li className="header-item">{fullUser.isAdmin ? <Link to="/admin">Admin panel</Link> : ""}</li>
                            <li className="header-item">{username ? <Link onClick={()=>localStorage.setItem("username",undefined)} to="/login">Log out</Link> : ""}</li>
                        </ul>
                    </nav>
                </div>
            </header>
        )
    }
}