import "../assets/singlePost.css";
export default function AdminPost(props){

    function postUpdate(status){
        const dataPost = {
            "name": props.name,
            "date": props.date,
            "info": props.info,
            "id": props.id,
            "status": status,
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
            .then(data => {console.log(data); window.location.reload()})
            .catch(err => console.log(err))
    }

    return(
        <div className="post">
            <div className="header-post">
                {props.name}
            </div>
            <div className="content-post">
                {props.info}
            </div>
            <div className="footer-post">
                <p>Created at: </p>
                {props.date}
            </div>
            <div className="controls-post">
                {props.status}
                <button onClick={()=>postUpdate("Rejected")} className="btn-post-admin">Rejected</button>
                <button onClick={()=>postUpdate("Approved")} className="btn-post-admin">Approved</button>
                {/*<button className="btn-post"></button>*/}
            </div>
        </div>
    )
}