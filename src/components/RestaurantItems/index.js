import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const RestaurantItems = props => {
  const {eachItem} = props
  const {id, name, imageUrl, cuisine, userRating} = eachItem
  const {ratingColor, totalReviews, rating} = userRating

  return (
    <Link to={`/restaurant/${id}`} className="link-component">
      <li className="each-restaurant-list">
        <img src={imageUrl} alt="restaurant" className="restaurant-image" />
        <div className="review-card">
          <h1 className="name">{name}</h1>
          <p className="food-type">{cuisine}</p>
          <div className="inner-card">
            <AiFillStar className="star-icon" style={{color: ratingColor}} />
            <p className="rating-num">{rating}</p>
            <p className="total-reviews">({totalReviews} rating)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItems
