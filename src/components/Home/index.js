import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {MdSort} from 'react-icons/md'
import {AiOutlineLeft, AiOutlineRight, AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'
import CarouselItems from '../CarouselItems'
import RestaurantItems from '../RestaurantItems'
import Footer from '../Footer'
import Locations from '../Locations'
import HowItWorks from '../HowItWorks'

import './style.css'

// list for sorting the items
const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

// object for API status
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'IN_PROGRESS',
}

class Home extends Component {
  // initializing the state
  state = {
    carouselList: [],
    activeSortId: sortByOptions[1].value,
    apiStatus: apiStatusConstants.initial,
    activePage: 1,
    limit: 9,
    offset: 0,
    restaurantsList: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getCarouselApi() // calling getCarouselApi to display offers
    this.getAllRestaurantsApi() // calling API function to display items
  }

  getAllRestaurantsApi = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    const {activeSortId, offset, limit, searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const apiUrl = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${limit}&sort_by_rating=${activeSortId}`

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const restaurantsData = data.restaurants.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        cuisine: eachItem.cuisine,
        imageUrl: eachItem.image_url,
        userRating: {
          ratingColor: eachItem.user_rating.rating_color,
          totalReviews: eachItem.user_rating.total_reviews,
          rating: eachItem.user_rating.rating,
        },
      }))
      this.setState({
        restaurantsList: restaurantsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getCarouselApi = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'

    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, option)
    const data = await response.json()
    if (response.ok === true) {
      const carouselData = data.offers.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.image_url,
      }))
      this.setState({carouselList: carouselData})
    }
  }

  // used react-slick third-party-package to display carousels
  getCarouselElement = () => {
    const {carouselList} = this.state

    const settings = {
      dots: true,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false,
    }

    return (
      <ul
        className="carousel-container"
        data-testid="restaurants-offers-loader"
      >
        <Slider {...settings}>
          {carouselList.map(eachItem => (
            <CarouselItems eachItem={eachItem} key={eachItem.id} />
          ))}
        </Slider>
      </ul>
    )
  }

  // updating option in select
  updateActiveId = event => {
    this.setState({activeSortId: event.target.value}, this.getAllRestaurantsApi)
  }

  getSortingComponent = () => {
    const {activeSortId} = this.state

    return (
      <div className="flex-sort">
        <MdSort className="sort-icon" />
        <label className="label-for-sort" htmlFor="sort">
          Sort by
        </label>
        <select
          className="dropdown-sorting-card"
          value={activeSortId}
          id="sort"
          onChange={this.updateActiveId}
        >
          {sortByOptions.map(eachItem => (
            <option
              value={eachItem.value}
              key={eachItem.id}
              className="custom-option-bg"
            >
              {eachItem.displayText}
            </option>
          ))}
        </select>
      </div>
    )
  }

  // JSX element for description
  getDescriptionContainer = () => (
    <div className="description-card">
      <div className="description-card-width">
        <h1 className="restaurant-text">Popular Restaurants</h1>
        <p className="description-text">
          Select your favourite restaurant special dish and make your day
          happy...
        </p>
      </div>
      <div className="dropdown-large-device">{this.getSortingComponent()}</div>
    </div>
  )

  // when retry button is clicked Api will be called in case any error occurs
  retryApiCall = () => {
    this.getAllRestaurantsApi()
  }

  // displaying failure view when any failure occurs
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

  // displaying loader for loading

  getLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ff8c21" height="50" width="50" />
    </div>
  )

  // calling RestaurantItems component

  getResults = () => {
    const {restaurantsList} = this.state

    return (
      <ul className="RestaurantItems-list">
        {restaurantsList.map(eachItem => (
          <RestaurantItems eachItem={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  getNoResults = () => {
    console.log('hello')
    return (
      <div className="no-results-view-container">
        <img
          src="https://res.cloudinary.com/dpcgriaf4/image/upload/v1694848781/9318694_ux0str.jpg"
          alt="no results"
          className="no-search-results-img"
        />
        <p className="no-results-found-text">No Results Found</p>
      </div>
    )
  }

  getResultsOfRestaurants = () => {
    const {restaurantsList} = this.state

    return (
      <>
        {restaurantsList.length > 0 ? this.getResults() : this.getNoResults()}
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

  // updating offset
  updateOffset = () => {
    const {activePage, limit} = this.state

    const offsetValue = (activePage - 1) * limit
    this.setState({offset: offsetValue}, this.getAllRestaurantsApi)
  }

  // updating active page when previous button clicks
  previousPage = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({activePage: prevState.activePage - 1}),
        this.updateOffset,
      )
    }
  }

  // updating active page when next button clicks
  nextPage = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      this.setState(
        prevState => ({activePage: prevState.activePage + 1}),
        this.updateOffset,
      )
    }
  }

  getPaginationContainer = () => {
    const {activePage} = this.state

    return (
      <div className="pagination-card">
        <button
          className="btn-pagination"
          type="button"
          onClick={this.previousPage}
        >
          <AiOutlineLeft className="arrow" />
        </button>
        <p className="pagination-text">{activePage} of 4</p>
        <button
          className="btn-pagination"
          type="button"
          onClick={this.nextPage}
        >
          <AiOutlineRight className="arrow" />
        </button>
      </div>
    )
  }

  onSubmitSearch = event => {
    event.preventDefault()

    this.getAllRestaurantsApi()
  }

  inputChange = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {carouselList, searchInput} = this.state
    return (
      <>
        <Header />
        {carouselList.length > 0 ? this.getCarouselElement() : null}
        {this.getDescriptionContainer()}
        <div className="horizontal-line-large">
          <hr />
        </div>
        <form className="search-card" onSubmit={this.onSubmitSearch}>
          <input
            type="search"
            value={searchInput}
            className="search-input"
            placeholder="Search"
            onChange={this.inputChange}
          />
          <button className="search-btn" type="submit">
            <AiOutlineSearch className="search-icon" />
          </button>
        </form>
        <div className="sorting-card-small">{this.getSortingComponent()}</div>
        {this.switchStatement()}
        {this.getPaginationContainer()}
        <Locations />
        <HowItWorks />
        <Footer />
      </>
    )
  }
}

export default Home
