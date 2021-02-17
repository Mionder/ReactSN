import "../assets/singlePost.css";
export default function AdminPost(props){

    function postUpdate(status){
        const dataPost = {
            "name": props.name,
            "date": props.date,
            "info": props.info,
            "id": props.id,
            "status": status,
            "category": props.category,
            "ownerId": props.ownerId,
            "clicks": props.clicks,
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
                <p className="category-post">Category: {props.category}</p>
                {props.info}
            </div>
            <div className="footer-post">
                <p>Created at: </p>
                {props.date}
            </div>
            <div className="controls-post">
                {props.status}
                <button onClick={()=>postUpdate("Rejected")} className="btn-post-admin">Reject</button>
                <button onClick={()=>postUpdate("Approved")} className="btn-post-admin">Approve</button>
                {/*<button className="btn-post"></button>*/}
            </div>
        </div>
    )
}