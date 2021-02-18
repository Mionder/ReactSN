import React, {Component} from "react";
import "../assets/registration.css";
import {saveUsers} from "../actions/actionCreator";
import {connect} from "react-redux";

class Login extends Component {
    state = {
        email: "",
        password: "",
        users: [],
    }

    signIn = async () => {
        await fetch("http://localhost:3000/users")
            .then((res) => {
                return res.json()
            })
            .then(async (data) => {
                console.log(data);
                await this.setState({users: data})
            })
            .catch((err) => {
                console.log(err)
            })

        this.validateUser();
    }

    validateUser = () => {
        const {users, email, password} = this.state;
        users.forEach((item) => {
            if (item.email === email && item.password === password) {
                localStorage.setItem("username", item.username);
                localStorage.setItem("userId", item.id);
                window.location.href = window.location.origin;
            }
        })
    }

    render() {
        return (
            <div className="login-page">
                <div className="_container">
                    <div className="login-wrapper">

                        <input
                            onChange={(e) => this.setState({email: e.target.value})}
                            placeholder="Enter email"
                            name="email"
                            type="text"
                            className="login-input"
                        />

                        <input
                            onChange={(e) => this.setState({password: e.target.value})}
                            placeholder="Enter password"
                            name="password"
                            type="password"
                            className="login-input"
                        />

                        <button onClick={this.signIn} className="btn">Sign In</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    users: state.users,
}), {saveUsers})(Login);