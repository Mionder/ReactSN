import React, {Component} from "react";
import {Link} from "react-router-dom";
import SinglePost from "./SinglePost";
export default class Home extends Component{
    state = {
        posts: [],
        isReady: false,
    }
    async componentDidMount () {
        await fetch("http://localhost:3000/posts")
            .then((res)=>{
                return res.json()
            })
            .then(async(data)=>{
                await this.setState({posts: data});
            })
            .catch(error => console.log(error))
        await this.filterPosts();
    }
    filterPosts = () => {
        const {posts} = this.state;
        let currentDate = new Date();
        let today = {
            year: currentDate.getFullYear(),
            month: +currentDate.getMonth()+1,
            day: currentDate.getDate(),
        }
        if (+today.month < 10){
            today.month = "0"+today.month;
        }
        let todayV2 = (today.year).toString() + "-" + (today.month).toString() + "-" + (today.day).toString();
        let filtered = posts.filter(item=> (item.date < todayV2 && item.status === "Approved"));
        this.setState({isReady: true, posts: filtered})
        // console.log(filtered);
        // posts.forEach((item)=>{
        //     console.log(todayV2, item.date)
        //     if(todayV2 > item.date){
        //
        //     }
        // })
        // console.log(today);
    }
    renderPosts = (arr) => {
        console.log(arr);
         return arr.map((item)=>{
             const {id,name, date, info} = item;
             return(
                 <SinglePost key={id} name={name} info={info} date={date} />
             )
         })
    }

    render() {
        const {username,isReady, posts} = this.state;
        let renderedPosts;
        if(isReady){
            renderedPosts = this.renderPosts(posts);
        }
        return(
            <div className="home">
                <div className="_container">
                    Home page
                    <div className="posts-wrapper">
                        {renderedPosts}
                    </div>
                </div>
            </div>
        )
    }
}