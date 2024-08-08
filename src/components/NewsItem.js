import React from 'react'

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, publishedDate, sourceName } = props;
  return (
    <div>
      <div className="my-3">
        <div className="card h-100">
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body ">
            <h5 className="card-title">{title} <span className="badge text-bg-secondary">{sourceName}</span> </h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">Article by {author} on {publishedDate}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn sm btn-dark ">Read More</a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default NewsItem 