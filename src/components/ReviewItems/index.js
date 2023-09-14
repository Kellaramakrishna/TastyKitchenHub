import {AiFillStar, AiFillDelete} from 'react-icons/ai'
import './index.css'

const ratingClassList = [
  {id: 'rating-1', className: 'red'},
  {id: 'rating-2', className: 'orange'},
  {id: 'rating-3', className: 'blue'},
  {id: 'rating-4', className: 'green'},
  {id: 'rating-5', className: 'dark-green'},
]
const ReviewItems = props => {
  const {eachItem, deleteReview} = props
  const {id, name, review, rating} = eachItem

  const getClassName = () => {
    const index = ratingClassList.findIndex(item => item.id === rating)
    return ratingClassList[index].className
  }

  const getRatingStars = () => {
    let jsx = null
    switch (rating) {
      case 'rating-1':
        jsx = (
          <div className="star-1">
            <AiFillStar className="stars-each" />
          </div>
        )
        return jsx
      case 'rating-2':
        jsx = (
          <div className="display-stars">
            <AiFillStar className="stars-each" />
            <AiFillStar className="stars-each" />
          </div>
        )
        return jsx
      case 'rating-3':
        jsx = (
          <div className="display-stars">
            <AiFillStar className="stars-each" />
            <AiFillStar className="stars-each" />
            <AiFillStar className="stars-each" />
          </div>
        )
        return jsx
      case 'rating-4':
        jsx = (
          <div className="display-stars">
            <AiFillStar className="stars-each" />
            <AiFillStar className="stars-each" />
            <AiFillStar className="stars-each" />
            <AiFillStar className="stars-each" />
          </div>
        )
        return jsx
      case 'rating-5':
        jsx = (
          <div className="display-stars">
            <AiFillStar className="stars-each" />
            <AiFillStar className="stars-each" />
            <AiFillStar className="stars-each" />
            <AiFillStar className="stars-each" />
            <AiFillStar className="stars-each" />
          </div>
        )
        return jsx

      default:
        return jsx
    }
  }

  const delReview = () => {
    deleteReview(id)
  }

  return (
    <li className="rating-list-each">
      <div className="name-and-rating">
        <div style={{width: '90%', display: 'flex'}}>
          <p className={`name-circle ${getClassName()}`}>
            {name[0].toUpperCase()}
          </p>
          <p className="name-customer">
            {name[0].toUpperCase() + name.slice(1)}
          </p>
          {getRatingStars()}
        </div>
        <div className="delete-review">
          <button
            type="button"
            onClick={delReview}
            className="delete-review-btn"
          >
            <AiFillDelete className="delete-icon-rating" />
          </button>
        </div>
      </div>
      <p className="review-description-rating">{review}</p>
    </li>
  )
}

export default ReviewItems
