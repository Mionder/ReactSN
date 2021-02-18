import React, {Component} from "react";
import "../assets/header.css";
import {Link} from "react-router-dom";
import $ from "jquery";

export default class Header extends Component {
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
            .then((res) => {
                return res.json()
            })
            .then(async (data) => {
                await this.setState({fullUser: data});
            })
            .catch(error => console.log(error))


        $(".header-mobile .fa-align-justify").click(function () {
            $(".header-mobile-list").toggle();
        })
        $('.header-item').click(function () {
            $('.header-mobile-list').hide();
        })
    }

    render() {
        const {username, fullUser} = this.state;
        return (
            <header className="header">
                <div className="_container">
                    <nav className="header-nav">
                        <ul className="header-list">
                            <li className="header-item"><Link to="/">Home</Link></li>
                            {username != "undefined" &&
                            <li className="header-item"><Link to="/create-post">Create Post</Link></li>}
                            <li className="header-item"><Link to="/shop">Shop</Link></li>
                            <li className="header-item">{username != "undefined" ?
                                <Link to={`/profile/${username}`}>Hello, {username}</Link> :
                                <Link to="/login">Sign in</Link>}</li>
                            {fullUser.isAdmin && username != "undefined" &&
                            <li className="header-item"><Link to="/admin">Admin panel</Link></li>}
                            {username != "undefined" && <li className="header-item"><Link
                                onClick={() => localStorage.setItem("username", undefined)} to="/login">Log out</Link>
                            </li>}
                        </ul>
                    </nav>
                    <div className="header-mobile">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="align-justify"
                             className="svg-inline--fa fa-align-justify fa-w-14" role="img"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill="currentColor"
                                  d="M432 416H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-128H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-128H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-128H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
                        </svg>
                        <ul className="header-mobile-list">
                            <li className="header-item"><Link to="/">Home</Link></li>
                            <li className="header-item"><Link to="/create-post">Create Post</Link></li>
                            <li className="header-item"><Link to="/shop">Shop</Link></li>
                            <li className="header-item">{username ?
                                <Link to={`/profile/${username}`}>Hello, {username}</Link> :
                                <Link to="/login">Sign in</Link>}</li>
                            {fullUser.isAdmin && <li className="header-item"><Link to="/admin">Admin panel</Link></li>}
                            {username && <li className="header-item"><Link
                                onClick={() => localStorage.setItem("username", undefined)} to="/login">Log out</Link>
                            </li>}
                        </ul>
                    </div>
                </div>
            </header>
        )
    }
}