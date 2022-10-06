import React, { Component } from 'react'

export default class NewsItem extends Component {

    render() {
        let {title,description,imageUrl,url,author,date,source} = this.props;
        return (

            <div className="card">
            <span class="position-absolute top-0 translate-middle badge badge-pill bg-primary" style={{left:"90%",zIndex:"1"}}>{source}</span>
                <img className="card-img-top" src={!imageUrl?"https://image.cnbcfm.com/api/v1/image/107114795-NYSE-Trading-Floor-Photo-220907-CC-PRESS-1.jpg?v=1664748134&w=1920&h=1080":imageUrl} alt="Card cap" />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className='card-text'><small className="muted=text">By {author?author:"Unknown "} on {new Date(date).toUTCString()} </small></p>
                    <a rel="noreferrer" href={url} target = "_blank" className="btn btn-primary">Read More</a>
                </div>
            </div>
        )
    }
}                                                   
