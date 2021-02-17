import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import "../assets/singlePost.css";
export default function SinglePost(props){
    const [author, setAuthor] = useState("");
    useEffect(()=>{
        fetch(`http://localhost:3000/users/${props.ownerId}`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setAuthor(data.username);
            })
            .catch(error => console.log(error))
    },[])

    function addClick(){
        localStorage.setItem("postId", props.id);
        let value= parseInt(props.clicks+1)
        const dataPost = {
            "name": props.name,
            "date": props.date,
            "info": props.info,
            "id": props.id,
            "status": props.status,
            "category": props.category,
            "clicks": value,
            "ownerId": props.ownerId,
        }

        const putMethod = {
            method: "PUT",
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(dataPost)
        }

        fetch(`http://localhost:3000/posts/${props.id}`, putMethod)
            .then(response => response.json())
            .then(data => {console.log(data)})
            .catch(err => console.log(err))
    }
    return(
        <div className="post">
            <div className={props.category === "books"
                ? "header-post book-st" : props.category === "work"
                    ? "header-post work-st" : props.category === "travel"
                        ? "header-post travel-st" : props.category === "games"
                            ? "header-post games-st" : "header-post"}>
               <Link onClick={addClick} to={{pathname:`/post/${props.id}`, propsId:props.id}}>{props.name}</Link>
            </div>
            <div className="content-post">
                <p className="category-post">Category: {props.category}</p>
                {props.info}
            </div>
            <div className="footer-post">
                <p>Created at: {props.date}</p>
                <p>Author: {author}</p>
            </div>
        </div>
    )
}