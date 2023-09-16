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
    this.getRestaurantApi() // calling restaurant Api
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
          isSaved: false,
        })),
      }
      const {foodItems} = restaurantData // storing foodItems separately

      this.setState({
        restaurantObj: restaurantData,
        foodItemsList: foodItems,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
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

  /* when ever user clicks on add to cart button then addToCart 
    function will be called  with arg object is passed */
  addToCartFun = (addToCart, index) => {
    const {foodItemsList} = this.state
    addToCart(foodItemsList[index])
  }

  // it calls the incrementCart function with id as arg
  incrementToCartFun = (id, incrementCart) => {
    incrementCart(id)
  }

  // it calls the decrementCart function with id as arg
  decrementToCartFun = (id, decrementCart) => {
    decrementCart(id)
  }

  /* when increment + button clicked state will be updated with quantity+1
  and then calls the next call back function that is incrementToCartFun */
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

  // when cart zero then deleteCart will be called

  removeItemInCartWhenCartZero = (id, deleteCart) => {
    deleteCart(id)
  }

  /* when quantity is 0 the add button 
  will be displayed by toggling isAdded property then calling callback fun
  to remove the item present in cart */

  getAddButton = (id, deleteCart) => {
    this.setState(
      prevState => ({
        foodItemsList: prevState.foodItemsList.map(eachItem => {
          if (eachItem.id === id) {
            return {
              ...eachItem,
              isAdded: !eachItem.isAdded,
              quantity: 0,
            }
          }
          return eachItem
        }),
      }),
      () => this.removeItemInCartWhenCartZero(id, deleteCart),
    )
  }

  /* when increment + button clicked state will be updated with quantity-1
  and then calls the next call back function that is decrementToCartFun */

  decrementItem = (id, quantity, decrementCart, deleteCart) => {
    if (quantity === 1) {
      this.getAddButton(id, deleteCart)
    } else {
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

  // updating foodItemsList with index

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

  // storing saved items in local storage with key saved

  storeInLocalStorage = () => {
    const {foodItemsList} = this.state
    const filteredList = foodItemsList.filter(
      eachItem => eachItem.isSaved === true,
    )
    localStorage.setItem('saved', JSON.stringify(filteredList))
  }

  // when save button clicked then the saveFunction exe

  saveFunction = id => {
    this.setState(
      prevState => ({
        foodItemsList: prevState.foodItemsList.map(eachItem => {
          if (eachItem.id === id) {
            return {
              ...eachItem,
              isSaved: !eachItem.isSaved,
            }
          }
          return eachItem
        }),
      }),
      this.storeInLocalStorage,
    )
  }

  // displays all food items
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
            saveFunction={this.saveFunction}
          />
        ))}
      </ul>
    )
  }

  // displays restaurants details view

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
