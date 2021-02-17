import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class PostPage extends Component{
    state = {
        post: {},
        isReady: false,
        author: "",
    }
    async componentDidMount() {
        let postId = localStorage.getItem("postId");
        await fetch(`http://localhost:3000/posts/${postId}`)
            .then((res)=>{
                return res.json()
            })
            .then(async(data)=>{
                await this.setState({post: data});
            })
            .catch(error => console.log(error))

        await fetch(`http://localhost:3000/users/${this.state.post.ownerId}`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                this.setState({author: data.username, isReady: true})
            })
            .catch(error => console.log(error))
    }
    renderPost = (post, author) => {
        const {date, info, ownerId, clicks, status, category, id, name} = post;
        let idUser = +localStorage.getItem("userId");
        return(
            <div className="post-single">
                <div className={category === "books"
                    ? "header-post book-st" : category === "work"
                        ? "header-post work-st" : category === "travel"
                            ? "header-post travel-st" : category === "games"
                                ? "header-post games-st" : "header-post"}>
                    {name}
                </div>
                <div className="content-post">
                    <p className="category-post">Category: {category}</p>
                    {info}
                </div>
                <div className="footer-post">
                    <p>Created at: {date}</p>
                    {idUser === +ownerId && <p>Clicks: {clicks}</p>}
                    <p>Author: {author}</p>
                </div>
            </div>
        )
    }

    render() {
        const {isReady, post, author} = this.state;
        let singlePost;
        if(isReady){
            singlePost = this.renderPost(post, author);
        }
        return(
            <div className="post-page">
                <div className="_container">
                    {singlePost}
                </div>
            </div>
        )
    }
}