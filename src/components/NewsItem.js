import React from 'react'

const NewsItem = (props) =>{
        let { title, description, imageUrl, newsUrl, author, date, source } = props
        return (
            <div>
                <div className="card my-3">
                    <div style={{display: "flex", alignItems: "center", position: "absolute", top:"0", right:"0"}}>
                        <span className="badge bg-danger">{source}
                        </span>
                    </div>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}  <span className="badge bg-secondary">new</span></h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">Last updated by {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Read More</a>
                    </div>
                </div>
            </div>
        )
    
}

export default NewsItem
