import React, {Component} from "react";
import AdminPost from "./AdminPost";

export default class Admin extends Component{
    state = {
        posts: []
    }

    async componentDidMount() {
        await fetch("http://localhost:3000/posts")
            .then((res)=>{
                return res.json()
            })
            .then(async(data)=>{
                await this.setState({posts: data, isReady: true});
            })
            .catch(error => console.log(error))
    }
    renderPosts = (arr) => {
        return arr.map((item)=>{
            const {id,name, date, info, status, category} = item;
            return(
                <AdminPost key={id} name={name} info={info} date={date} id={id} status={status} category={category} />
            )
        })
    }

    render() {
        const {isReady, posts} = this.state;
        let renderedPosts;
        if(isReady){
            renderedPosts = this.renderPosts(posts);
        }
        return(
            <div className="admin-panel">
                <div className="_container">
                    <div className="posts-wrapper">
                        {renderedPosts}
                    </div>
                </div>
            </div>
        )
    }
}