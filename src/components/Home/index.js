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

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'IN_PROGRESS',
}

class Home extends Component {
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
    this.getCarouselApi()
    this.getAllRestaurantsApi()
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

  retryApiCall = () => {
    this.getAllRestaurantsApi()
  }

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

  getLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ff8c21" height="50" width="50" />
    </div>
  )

  getResultsOfRestaurants = () => {
    const {restaurantsList} = this.state

    return (
      <ul className="RestaurantItems-list">
        {restaurantsList.map(eachItem => (
          <RestaurantItems eachItem={eachItem} key={eachItem.id} />
        ))}
      </ul>
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

  updateOffset = () => {
    const {activePage, limit} = this.state

    const offsetValue = (activePage - 1) * limit
    this.setState({offset: offsetValue}, this.getAllRestaurantsApi)
  }

  previousPage = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({activePage: prevState.activePage - 1}),
        this.updateOffset,
      )
    }
  }

  nextPage = () => {
    const {activePage} = this.state
    if (activePage < 20) {
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
