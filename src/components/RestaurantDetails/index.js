import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import Header from '../Header'
import Footer from '../Footer'
import DetailsItems from '../DetailsItems'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'IN_PROGRESS',
}

class RestaurantDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    restaurantObj: {},
    foodItemsList: [],
  }

  componentDidMount() {
    this.getRestaurantApi()
  }

  getRestaurantApi = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const response = await fetch(url, option)

    const data = await response.json()

    if (response.ok === true) {
      const restaurantData = {
        name: data.name,
        cuisine: data.cuisine,
        imageUrl: data.image_url,
        location: data.location,
        rating: data.rating,
        reviewsCount: data.reviews_count,
        costForTwo: data.cost_for_two,
        foodItems: data.food_items.map(eachItem => ({
          name: eachItem.name,
          cost: eachItem.cost,
          rating: eachItem.rating,
          id: eachItem.id,
          imageUrl: eachItem.image_url,
        })),
      }
      const {foodItems} = restaurantData

      this.setState({
        restaurantObj: restaurantData,
        foodItemsList: foodItems,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  getLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ff8c21" height="50" width="50" />
    </div>
  )

  getFailureView = () => (
    <div className="failure-view-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="img-failure"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="description-failure">
        We cannot seem to find the page your looking for.
      </p>
      <button type="button" className="retry-btn" onClick={this.retryApiCall}>
        Retry
      </button>
    </div>
  )

  addToCartFun = (addToCart, index) => {
    const {foodItemsList} = this.state
    addToCart(foodItemsList[index])
  }

  incrementToCartFun = (id, incrementCart) => {
    incrementCart(id)
  }

  decrementToCartFun = (id, decrementCart) => {
    decrementCart(id)
  }

  incrementItem = (id, incrementCart) => {
    this.setState(
      prevState => ({
        foodItemsList: prevState.foodItemsList.map(eachItem => {
          if (eachItem.id === id) {
            return {
              ...eachItem,
              quantity: eachItem.quantity + 1,
            }
          }
          return eachItem
        }),
      }),
      () => this.incrementToCartFun(id, incrementCart),
    )
  }

  decrementItem = (id, quantity, decrementCart) => {
    if (quantity > 1) {
      this.setState(
        prevState => ({
          foodItemsList: prevState.foodItemsList.map(eachItem => {
            if (eachItem.id === id) {
              return {
                ...eachItem,
                quantity: eachItem.quantity - 1,
              }
            }
            return eachItem
          }),
        }),
        () => this.decrementToCartFun(id, decrementCart),
      )
    }
  }

  isAddClickFun = (index, addToCart) => {
    const {foodItemsList} = this.state

    const updateList = [...foodItemsList]

    updateList[index] = {
      ...updateList[index],
      isAdded: true,
      quantity: 1,
    }

    this.setState({foodItemsList: updateList}, () =>
      this.addToCartFun(addToCart, index),
    )
  }

  getFoodItems = () => {
    const {foodItemsList} = this.state

    return (
      <ul className="each-details-list">
        {foodItemsList.map((eachItem, index) => (
          <DetailsItems
            eachItem={eachItem}
            key={eachItem.id}
            isAddClickFun={this.isAddClickFun}
            isAdded={eachItem.isAdded}
            index={index}
            incrementItem={this.incrementItem}
            decrementItem={this.decrementItem}
            foodItemsList={foodItemsList}
          />
        ))}
      </ul>
    )
  }

  getResultsOfRestaurants = () => {
    const {restaurantObj} = this.state

    const {
      name,
      cuisine,
      imageUrl,
      location,
      rating,
      reviewsCount,
      costForTwo,
    } = restaurantObj

    return (
      <>
        <div className="banner-restaurant-img-bg">
          <div className="banner-card-inner">
            <div className="img-details-card">
              <img
                src={imageUrl}
                alt="restaurant"
                className="img-restaurant-details"
              />
            </div>
            <div className="details-card">
              <div>
                <h1 className="details-name">{name}</h1>
                <p className="details-description">{cuisine}</p>
                <p className="details-address">{location}</p>

                <div className="details-inner-card">
                  <div className="card1">
                    <AiFillStar className="star-in-details" />
                    <p className="rating-details">{rating}</p>
                    <p className="details-reviews">{reviewsCount}+ ratings</p>
                  </div>
                  <hr />
                  <div className="card2">
                    <BiRupee className="rupee-icon" />
                    <p className="cost-details">{costForTwo}</p>
                    <p className="cost-text">Cost for two</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.getFoodItems()}
      </>
    )
  }

  switchStatement = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getResultsOfRestaurants()
      case apiStatusConstants.failure:
        return this.getFailureView()
      case apiStatusConstants.loading:
        return this.getLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />

        {this.switchStatement()}
        <Footer />
      </>
    )
  }
}

export default RestaurantDetails
