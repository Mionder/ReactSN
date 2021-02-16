import React, {Component} from "react";
import {Link} from "react-router-dom";
import SinglePost from "./SinglePost";
import "../assets/main.css";
export default class Home extends Component {
    state = {
        posts: [],
        isReady: false,
        filteredPosts: [],
        categories: [],
        category: "",
        fullUser: "",
    }

    async componentDidMount() {
        let id = localStorage.getItem("userId");
        fetch(`http://localhost:3000/users/${id}`)
            .then((res)=>{
                return res.json()
            })
            .then(async(data)=>{
                await this.setState({fullUser: data});
            })
            .catch(error => console.log(error))

        await fetch("http://localhost:3000/posts")
            .then((res) => {
                return res.json()
            })
            .then(async (data) => {
                await this.setState({posts: data});
            })
            .catch(error => console.log(error))
        await this.filterPosts();

        fetch("http://localhost:3000/categotiesPosts")
            .then((res) => {
                return res.json()
            })
            .then(async (data) => {
                await this.setState({categories: data, isReady: true});
            })
            .catch(error => console.log(error))
    }

    filterPosts = () => {
        const {posts, category} = this.state;
        let currentDate = new Date();
        let today = {
            year: currentDate.getFullYear(),
            month: +currentDate.getMonth() + 1,
            day: currentDate.getDate(),
        }
        if (+today.month < 10) {
            today.month = "0" + today.month;
        }
        let todayV2 = (today.year).toString() + "-" + (today.month).toString() + "-" + (today.day).toString();
        let filtered;
        if (category === "") {
            filtered = posts.filter(item => (item.date < todayV2 && item.status === "Approved"));
        } else {
            filtered = posts.filter(item => (item.date < todayV2 && item.status === "Approved" && item.category === category));
        }
        this.setState({filteredPosts: filtered})
    }
    renderPosts = (arr) => {
        return arr.map((item) => {
            const {id, name, date, info, category} = item;
            return (
                <SinglePost key={id} name={name} category={category} info={info} date={date}/>
            )
        })
    }

    renderSelectCategories = () => {
        const {categories} = this.state;
        return categories.map((item, index) => {
            return (
                <option onClick={this.filterPosts} key={index} value={item}>{item}</option>
            )
        })
    }


    render() {
        const {fullUser, isReady, posts, categories, filteredPosts} = this.state;
        let renderedPosts, myCategories;
        if (isReady) {
            renderedPosts = this.renderPosts(filteredPosts);
            myCategories = this.renderSelectCategories(categories);
        }
        return (
            <div className="home">
                <div className="_container">
                    <div className="home-wrapper">
                        <div className="sidebar">
                            <ul className="sidebar-list">
                                <li className="sidebar-item">{fullUser.username ? `Hello, ${fullUser.username}` : "Welcome to social network"}</li>
                                {fullUser.username && <li className="sidebar-item"><Link to="/create-post">Create post</Link></li> }
                                <li className="sidebar-item">Shop</li>
                                {fullUser.username &&<li className="sidebar-item"><Link onClick={()=>localStorage.setItem("username",undefined)} to="/login">Log out</Link></li>}
                            </ul>
                        </div>
                        <div className="content-wrapper">
                            <select
                                className="home-category-select"
                                onChange={(e) => this.setState({category: e.target.value})}
                                name="category-post" id="category-post"
                                placeholder="Enter post category">
                                <option onClick={this.filterPosts} selected value="">All</option>
                                {myCategories}
                            </select>
                            <div className="posts-wrapper">
                                {renderedPosts}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}