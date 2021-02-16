import "../assets/singlePost.css";
export default function SinglePost(props){
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
        </div>
    )
}