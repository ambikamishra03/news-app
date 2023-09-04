import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description,imgUrl,newsUrl, author, date } =this.props;
    return (
      <div className='my-3'>
<div className="card">
  <img className="card-img-top" src={!imgUrl?"https://th.bing.com/th/id/R.067d5a124b88047cafe147e2ecf48324?rik=RYXCxWl89388HA&riu=http%3a%2f%2f1.bp.blogspot.com%2f-2uldf-XdjoI%2fUDHADUlgMGI%2fAAAAAAAAAMo%2f4kKgv992Utc%2fs1600%2fAshoka.png&ehk=9kdlH0W%2bS7FDt6b0CXXLeiDRQOtQ5dlc592PAsVvgMY%3d&risl=&pid=ImgRaw&r=0":imgUrl} alt="..." />
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}.......</p>
    <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} rel="noreferrer"  target="_blank" className="btn btn-sm btn-primary">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem