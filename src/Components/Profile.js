import React, {Component} from "react";
import ImageUploader from "react-images-upload";
import ImageUploadering from "./ImageUploader";
export default class Profile extends Component{
    state = {
        pictures: {},
        active: false,
        users: [],
    }
    componentDidMount() {
         fetch("http://localhost:3000/users")
            .then((res)=>{
                return res.json()
            })
            .then(async(data)=>{
                console.log(data);
                await this.setState({users:data});
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    getPictures = (data) => {
        let activeId = 11;
        const {users} = this.state;
        this.setState({pictures: data, active: true});
        console.log(data);
        let newData = {
            "username": users[activeId-1].username,
            "id": users[activeId-1].id,
            "password": users[activeId-1].password,
            "email": users[activeId-1].email,
            "image": data[0].name
        }
        const putMethod = {
            method: "PUT",
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(newData)
        }

// make the HTTP put request using fetch api
        fetch(`http://localhost:3000/users/${activeId}`, putMethod)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }
    render() {
        const {users,pictures, active} = this.state;
        // console.log(pictures[0].name);
        return(
            <div>
                { active &&
                    <img src={`../../storage/img-profile/${users[4].image}`} alt="no-ui-img"/>
                }
                <ImageUploadering getPictures={this.getPictures} />
            </div>
        )
    }
}