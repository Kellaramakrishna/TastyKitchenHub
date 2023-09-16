import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

// import class component and extending properties and methods from React.Component class
class Login extends Component {
  state = {username: '', password: '', isErrMsg: false, errorMsg: ''} // initializing state

  getUsernameInput = event => {
    this.setState({username: event.target.value}) // method is used to store the username
  }

  getPasswordInput = event => {
    this.setState({password: event.target.value}) // method is used to store the password
  }

  onSubmitSuccessFull = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30}) // used for navigating to home page when login success
    const {history} = this.props
    history.replace('/')
  }

  // on submitting form API call will be made
  getAnApiCall = async () => {
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }

    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const url = 'https://apis.ccbp.in/login'

    const response = await fetch(url, option)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccessFull(data.jwt_token) // calling onSubmitSuccessFull function
    } else {
      this.setState({isErrMsg: true, errorMsg: data.error_msg})
    }
  }

  submitDetails = event => {
    const {username} = this.state
    event.preventDefault()
    localStorage.setItem('username', JSON.stringify(username)) // storing user name in local storage with key username
    this.getAnApiCall() // calling API
  }

  // JSX element from mobile view
  getMobileViewCard = () => (
    <div className="website-login-logo-card">
      <img
        src="https://res.cloudinary.com/dpcgriaf4/image/upload/v1692620446/tastyKitchen/Rectangle_1457_p6fi97.png"
        alt="website login mobile"
        className="website-logo-mobile"
      />
    </div>
  )

  // login form for user input

  getLoginFormCard = () => {
    const {username, password, isErrMsg, errorMsg} = this.state

    return (
      <form className="form-card" onSubmit={this.submitDetails}>
        <div className="flex-container">
          <label htmlFor="username" className="text-name">
            USERNAME
          </label>
          <input
            type="text"
            value={username}
            id="username"
            className="input-box"
            placeholder=""
            onChange={this.getUsernameInput}
          />
        </div>
        <div className="flex-container">
          <label htmlFor="password" className="text-name">
            PASSWORD
          </label>
          <input
            type="password"
            value={password}
            id="password"
            className="input-box"
            placeholder=""
            onChange={this.getPasswordInput}
          />
        </div>
        {isErrMsg && <p className="error-msg">*{errorMsg}</p>}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    )
  }

  getLoginContainerSmall = () => (
    <div className="login-form-card">
      <p className="login-text">Login</p>
      {this.getLoginFormCard()}
    </div>
  )

  // login form for large devices
  getLoginFormLargeDevice = () => (
    <div className="large-device-form">
      <div className="large-login-card">
        <img
          src="https://res.cloudinary.com/dpcgriaf4/image/upload/v1692709685/tastyKitchen/Group_7420_fxulpm.png"
          alt="website logo"
          className="logo-img"
        />
        <p className="company-name">Tasty Kitchens</p>
        <p className="login-text-large">Login</p>
        {this.getLoginFormCard()}
      </div>
    </div>
  )

  getLargeVIewCardImage = () => (
    <div className="large-device-image-card">
      <img
        src="https://res.cloudinary.com/dpcgriaf4/image/upload/v1692708307/tastyKitchen/Rectangle_1456_img_djdfxd.png"
        alt="website login"
        className="large-img"
      />
    </div>
  )

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" /> // it redirects to home page when jwt present in cookies and does not displays login UI
    }
    return (
      <div className="bg-container">
        {this.getMobileViewCard()}
        {this.getLoginContainerSmall()}
        {this.getLoginFormLargeDevice()}
        {this.getLargeVIewCardImage()}
      </div>
    )
  }
}

export default Login
