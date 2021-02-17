import React, {Component} from "react";
import AdminPost from "./AdminPost";

export default class Admin extends Component {
    state = {
        posts: [],
        clicksAmount: 0,
        popularCategory: "",
        categories: [
            "travel",
            "work",
            "books",
            "games"
        ],
        mostPosts: "",
    }

    async componentDidMount() {
        await fetch("http://localhost:3000/posts")
            .then((res) => {
                return res.json()
            })
            .then(async (data) => {
                await this.setState({posts: data, isReady: true});
            })
            .catch(error => console.log(error))

        this.countAnalytic(this.state.posts);
    }

    renderPosts = (arr) => {
        return arr.map((item) => {
            const {id, name, ownerId, date, info, status, clicks, category} = item;
            return (
                <AdminPost key={id} ownerId={ownerId} name={name} clicks={clicks} info={info} date={date} id={id}
                           status={status} category={category}/>
            )
        })
    }
    countAnalytic = (arr) => {
        const {categories} = this.state;
        let clicksAmount = 0;
        arr.forEach(item => {
            clicksAmount += item.clicks;
        })
        let maxPosts = 0;
        let maxClicks = 0;
        categories.forEach(async (element, index) => {
            let filt = arr.filter(item => item.category === element);
            let count = 0;
            filt.forEach(item => {
                count += item.clicks;
            })
            if (count > maxClicks) {
                maxClicks = count;
                this.setState({popularCategory: element});
            }
            if (filt.length > maxPosts) {
                maxPosts = filt.length;
                await this.setState({mostPosts: element});
            }
        })

        this.setState({clicksAmount: clicksAmount})
    }

    render() {
        const {isReady, posts, clicksAmount, popularCategory, mostPosts} = this.state;
        let renderedPosts;
        if (isReady) {
            renderedPosts = this.renderPosts(posts);
        }
        return (
            <div className="admin-panel">
                <div className="_container">
                    <div className="subheader-admin">
                        <ul className="subheader-list">
                            <li className="subheader-item">Posts</li>
                            <li className="subheader-item">Analytic</li>
                            <li className="subheader-item">Shop</li>
                        </ul>
                    </div>
                    <div className="statistic">
                        <p>
                            <span className="stat-title">Amount clicks:  </span> {clicksAmount}
                        </p>
                        <p>
                            <span className="stat-title">Most clicks on:  </span>{popularCategory}
                        </p>
                        <p>
                            <span className="stat-title">Most posts:  </span> {mostPosts}
                        </p>
                    </div>



                    <div className="posts-wrapper">
                        {renderedPosts}
                    </div>
                </div>
            </div>
        )
    }
}