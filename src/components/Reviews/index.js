import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import ReviewItems from '../ReviewItems'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const reviewsList = []

const ratingList = [
  {id: 'rating-1', r: 1},
  {id: 'rating-2', r: 2},
  {id: 'rating-3', r: 3},
  {id: 'rating-4', r: 4},
  {id: 'rating-5', r: 5},
]

const empty = ''
class Reviews extends Component {
  state = {
    reviewsListData: reviewsList,
    name: '',
    review: '',
    rating: ratingList[4].id,
    isErrorMsg: false,
  }

  componentDidMount() {
    const reviewData = JSON.parse(localStorage.getItem('reviews'))
    if (reviewData === null) {
      this.setState({reviewsListData: reviewsList})
    } else {
      this.setState({reviewsListData: reviewData})
    }
  }

  getName = event => {
    this.setState({name: event.target.value})
  }

  getReview = event => {
    this.setState({review: event.target.value})
  }

  getRating = event => {
    this.setState({rating: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {name, review, rating, reviewsListData} = this.state
    if (name !== '' && review !== '') {
      const reviewData = {
        id: uuidv4(),
        name,
        review,
        rating,
      }
      const dataList = [...reviewsListData, reviewData]
      localStorage.setItem('reviews', JSON.stringify(dataList))
      this.setState(prevState => ({
        reviewsListData: [...prevState.reviewsListData, reviewData],
        isErrorMsg: false,
        name: '',
        review: '',
        rating: ratingList[4].id,
      }))
    } else {
      this.setState({isErrorMsg: true})
    }
  }

  getInputFromUSer = () => {
    const {name, review, rating, isErrorMsg} = this.state
    return (
      <div className="reviews-container">
        <div className="img-review-card">
          <img
            src="https://res.cloudinary.com/dpcgriaf4/image/upload/v1694662204/tastyKitchen/12704408_5002461_wais6q.jpg"
            alt="review img"
            className="img-review"
          />
        </div>
        <form className="form-review-input" onSubmit={this.onSubmitForm}>
          <div className="input-card-review">
            <label htmlFor="name" className="review-text-">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              className="input-review"
              placeholder="Enter Name"
              onChange={this.getName}
            />
          </div>
          <div className="input-card-review">
            <label htmlFor="review" className="review-text-">
              Review
            </label>
            <textarea
              type="text"
              id="review"
              value={review}
              className="text-area-review"
              placeholder="Write Your Review"
              onChange={this.getReview}
            >
              {empty}
            </textarea>
            <div className="input-card-review">
              <label htmlFor="rating" className="review-text-">
                Select Rating
              </label>
              <select
                className="drop-down-rating-"
                value={rating}
                id="rating"
                onChange={this.getRating}
              >
                {ratingList.map(eachItem => (
                  <option
                    value={eachItem.id}
                    key={eachItem.id}
                    className="rating-text"
                  >
                    {eachItem.r}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {isErrorMsg ? (
            <p className="error-msg-review">*Please Fill the details</p>
          ) : null}
          <button className="form-submit-review" type="submit">
            Submit
          </button>
        </form>
      </div>
    )
  }

  deleteReview = id => {
    const {reviewsListData} = this.state
    const dataList = reviewsListData.filter(eachItem => eachItem.id !== id)
    localStorage.setItem('reviews', JSON.stringify(dataList))
    this.setState({reviewsListData: dataList})
  }

  getReviews = () => {
    const {reviewsListData, rating} = this.state
    console.log(typeof rating)

    return (
      <ul className="review-list-items">
        <hr style={{marginBottom: '20px', marginTop: '20px'}} />
        {reviewsListData.map(eachItem => (
          <ReviewItems
            eachItem={eachItem}
            key={eachItem.id}
            deleteReview={this.deleteReview}
          />
        ))}
      </ul>
    )
  }

  getNoReviews = () => <h1 className="no-reviews">No Reviews Yet!</h1>

  render() {
    const {reviewsListData} = this.state
    return (
      <>
        <Header />
        <h1 className="reviews-heading">TastyKitchens Reviews:</h1>
        <p className="reviews-description">
          Your Culinary Stories Join the Conversation and Share Your Tastes.
        </p>
        {this.getInputFromUSer()}
        {reviewsListData.length > 0 ? this.getReviews() : this.getNoReviews()}
        <Footer />
      </>
    )
  }
}

export default Reviews
