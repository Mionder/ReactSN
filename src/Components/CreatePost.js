import React, {Component} from "react";
import "../assets/createPost.css";
import { Alert, AlertTitle } from '@material-ui/lab';
import DrugAndDrop from "./DrugAndDrop";
import ImageUploadering from "./ImageUploader";
export default class CreatePost extends Component {
    state = {
        name: "",
        date: "",
        info: "",
        category: "",
        isError: false,
        errorMessage: "",
        categories: [],
        isReady: false,
    }

    componentDidMount() {
        fetch("http://localhost:3000/categotiesPosts")
            .then((res)=>{
                return res.json()
            })
            .then(async(data)=>{
                await this.setState({categories: data, isReady:true});
            })
            .catch(error => console.log(error))
    }

    createPost = () => {
        this.setState({isError: false})
        const {name, date, info, isError, category} = this.state;
        let localError = false;
        console.log(category);
        if (name === "" || date === "" || info === "" || category === "") {
            this.setState({isError: true, errorMessage: "You need to enter all fields"})
            localError = true;
        }
        if(info.length < 50){
            this.setState({isError: true, errorMessage: "Post info must be more than 50 symbols"})
            localError = true;
        }
        if(!localError){
            let idUser = localStorage.getItem("userId");
            const post = {
                "name": name,
                "date": date,
                "info": info,
                "category": category,
                "status": "Not Approved",
                "ownerId": idUser,
                "clicks": 0,
            }
            fetch("http://localhost:3000/posts",
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(post)
                })
                .then(function (res) {
                    console.log(res);
                    window.location.href = window.location.origin;
                })
                .catch(error => console.log(error))
        }
    }

    renderSelectCategories = () => {
        const {categories} = this.state;
        return categories.map((item, index)=>{
            return(
                <option key={index} value={item}>{item}</option>
            )
        })
    }

    render() {
        const {isError, errorMessage, categories,isReady} = this.state;
        let myCategories;
        if(isReady){
            myCategories = this.renderSelectCategories(categories);
        }
        return (
            <div className="create-post">
                <div className="_container">

                    <h3 className="title">Create your post</h3>
                    <div className="post-wrapper">
                        <div className="form-post">
                            <label htmlFor="name-post" className="post-label">Post name</label>
                            <input onChange={(e) => this.setState({name: e.target.value})} type="text" id="name-post"
                                   placeholder="Enter post name" name="name" className="post-input"/>
                            <label htmlFor="category-post" className="post-label">Post category</label>
                            <select onChange={(e)=>this.setState({category: e.target.value})} name="category-post" id="category-post" placeholder="Enter post category" className="post-input">
                                <option selected disabled value="">Select category</option>
                                {myCategories}
                            </select>
                            <label htmlFor="date-post" className="post-label">Post date</label>
                            <input onChange={(e) => this.setState({date: e.target.value})} type="date" id="date-post"
                                   placeholder="Enter date of post" className="post-input"/>
                            <label htmlFor="text-post" className="post-label">Post text</label>
                            {/*<input type="text" className="post-input"/>*/}
                            <textarea onChange={(e) => this.setState({info: e.target.value})} name="info" id="text-post"
                                      placeholder="Enter your post text" cols="30" rows="10" className="post-textarea">

                            </textarea>
                            <button onClick={this.createPost} className="btn-post">Create post</button>

                            {/*<ImageUploadering getPictures={this.getPictures} />*/}
                        </div>
                    </div>
                    {
                        isError &&
                            <div className="error-block">
                                <Alert severity="error">
                                    <AlertTitle>Error - {errorMessage}</AlertTitle>
                                </Alert>
                            </div>
                    }
                </div>
            </div>
        )
    }
}