import React, {Component} from "react";
import "../assets/profile.css";
import {Link} from "react-router-dom";
export default class Profile extends Component{
    state = {
        pictures: {},
        isReady: false,
        user: {},
        posts: [],
    }
    componentDidMount() {
        let userId = localStorage.getItem("userId");
         fetch(`http://localhost:3000/users/${userId}`)
            .then((res)=>{
                return res.json()
            })
            .then(async(data)=>{
                await this.setState({user:data});
            })
            .catch((err)=>{
                console.log(err)
            })
        fetch(`http://localhost:3000/posts`)
            .then((res)=>{
                return res.json()
            })
            .then(async(data)=>{
                let filteredPosts = data.filter(item=> +item.ownerId === +userId)
                await this.setState({posts:filteredPosts, isReady: true});
            })
            .catch((err)=>{
                console.log(err)
            })

    }

    renderUser = (user) => {
        return(
            <div className="user">
                <div className="user-photo">
                    <img src="https://fakeimg.pl/250x250/" alt="no-img" />
                </div>
                <div className="user-info">
                    <p className="user-username">Welcome, {user.username}</p>
                </div>
            </div>
        )
    }
    renderPosts = (arr) => {
        return arr.map((item, index)=>{
            return(
                <div key={index} className="user-post">
                    <p><Link onClick={()=>localStorage.setItem("postId", item.id)} to={{pathname:`/post/${item.id}`, propsId:item.id}}>{item.name}</Link></p>
                    <p>{item.date}</p>
                </div>
            )
        })
    }

    render() {
        const {user,pictures, isReady, posts} = this.state;
        // console.log(pictures[0].name);
        let userCurrent, userPosts;
        if(isReady){
            userCurrent = this.renderUser(user);
            userPosts = this.renderPosts(posts);
        }
        return(
            <div className="profile">
                <div className="_container">
                    <div className="profile-wrapper">
                        <div className="profile-info">
                            {userCurrent}
                        </div>
                        <div className="user-posts-wrapper">
                            <p className="profile-title">Your posts: </p>
                            {userPosts}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}