import "../assets/singlePost.css";
export default function SinglePost(props){
    return(
        <div className="post">
            <div className={props.category === "books"
                ? "header-post book-st" : props.category === "work"
                    ? "header-post work-st" : props.category === "travel"
                        ? "header-post travel-st" : props.category === "games"
                            ? "header-post games-st" : "header-post"}>
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
        </div>
    )
}