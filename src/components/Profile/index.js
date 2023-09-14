import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {AiOutlineClose, AiFillStar, AiOutlineCheck} from 'react-icons/ai'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const profileList = [
  {
    id: 1,
    imageUrl:
      'https://res.cloudinary.com/dpcgriaf4/image/upload/v1693108759/tastyKitchen/profile-male-3-removebg-preview_mizkrt.png',
  },

  {
    id: 2,
    imageUrl:
      'https://res.cloudinary.com/dpcgriaf4/image/upload/v1693108755/tastyKitchen/profile-male-2-removebg-preview_ntu7pd.png',
  },

  {
    id: 3,
    imageUrl:
      'https://res.cloudinary.com/dpcgriaf4/image/upload/v1693108752/tastyKitchen/profile-male-1-removebg-preview_vyajfv.png',
  },

  {
    id: 4,
    imageUrl:
      'https://res.cloudinary.com/dpcgriaf4/image/upload/v1693108749/tastyKitchen/profile-female-3-removebg-preview_elhsm8.png',
  },

  {
    id: 5,
    imageUrl:
      'https://res.cloudinary.com/dpcgriaf4/image/upload/v1693108746/tastyKitchen/profile-female-2-removebg-preview_ohzrsd.png',
  },

  {
    id: 6,
    imageUrl:
      'https://res.cloudinary.com/dpcgriaf4/image/upload/v1693108743/tastyKitchen/profile-female-1-removebg-preview_otifmy.png',
  },
]

const defaultProfile = {
  id: 1,
  imageUrl:
    'https://res.cloudinary.com/dpcgriaf4/image/upload/v1693109245/tastyKitchen/user_3177440_x0zi0r.png',
}

const empty = ''

const Profile = () => {
  const getProfileFromLocalStorage = () => {
    const data = localStorage.getItem('profile')
    const parsedData = JSON.parse(data)

    if (data === null) {
      return defaultProfile.imageUrl
    }
    return parsedData.imageUrl
  }

  const [profileUrl, setProfileState] = useState(getProfileFromLocalStorage())
  const [nameOfUser, setName] = useState('')
  const [emailOfUser, setEmail] = useState('')
  const [aboutOfUser, setAboutMe] = useState('')
  const [userAddress, setAddress] = useState([])

  useEffect(() => {
    const data = localStorage.getItem('details')
    const parsedData = JSON.parse(data)

    const userData = localStorage.getItem('user_details')
    const userDataList = JSON.parse(userData)

    if (parsedData !== null) {
      setName(parsedData.name)
      setEmail(parsedData.email)
      setAboutMe(parsedData.about)
    }

    if (userData !== null) {
      setAddress(userDataList)
    }
  }, [])

  const changeProfile = (imageUrl, id) => {
    const newListProfile = {id, imageUrl}

    localStorage.setItem('profile', JSON.stringify(newListProfile))

    setProfileState(imageUrl)
  }

  const removeProfile = () => {
    setProfileState(defaultProfile.imageUrl)
    localStorage.removeItem('profile')
  }

  const setNameOfUser = event => {
    setName(event.target.value)
  }

  const setEmailOfUser = event => {
    setEmail(event.target.value)
  }

  const setAboutOfUser = event => {
    setAboutMe(event.target.value)
  }

  const addProfileDetails = event => {
    event.preventDefault()
    const details = {
      name: nameOfUser,
      email: emailOfUser,
      about: aboutOfUser,
    }
    localStorage.setItem('details', JSON.stringify(details))
  }

  const getFormEleForUserDetails = () => (
    <form className="form-for-profile" onSubmit={addProfileDetails}>
      <label className="label-user" htmlFor="name-user">
        Name :
      </label>
      <div className="input-box-profile">
        <input
          type="text"
          value={nameOfUser}
          id="name-user"
          className="input-profile"
          onChange={setNameOfUser}
        />
        {nameOfUser !== '' ? (
          <button className="button-check" type="button">
            <AiOutlineCheck className="check-icon" />
          </button>
        ) : null}
      </div>
      <label className="label-user" htmlFor="name-user">
        Email :
      </label>
      <div className="input-box-profile">
        <input
          type="text"
          value={emailOfUser}
          id="name-user"
          className="input-profile"
          onChange={setEmailOfUser}
        />
        {emailOfUser !== '' && emailOfUser.includes('@') ? (
          <button className="button-check" type="button">
            <AiOutlineCheck className="check-icon" />
          </button>
        ) : null}
      </div>
      <label className="label-user" htmlFor="name-user">
        About Me :
      </label>
      <div className="input-box-profile">
        <textarea
          type="text"
          value={aboutOfUser}
          id="name-user"
          className="about-profile"
          onChange={setAboutOfUser}
        >
          {empty}
        </textarea>
        {aboutOfUser !== '' ? (
          <button className="button-check" type="button">
            <AiOutlineCheck className="check-icon" />
          </button>
        ) : null}
      </div>
      <div className="submit-profile-card">
        <button className="btn-submit-profile" type="submit">
          Submit
        </button>
      </div>
    </form>
  )

  const removeAddress = id => {
    const filteredList = userAddress.filter(eachItem => eachItem.id !== id)

    localStorage.setItem('user_details', JSON.stringify(filteredList))
    setAddress(filteredList)
  }

  const getListOfAddress = () => (
    <ul className="address-list">
      {userAddress.map(eachItem => (
        <li key={eachItem.id} className="list-each-address">
          <div className="btn-card-profile">
            <button
              type="button"
              className="btn-close-profile"
              onClick={() => removeAddress(eachItem.id)}
            >
              <AiOutlineClose className="delete-address" />
            </button>
          </div>
          <p>Phone:- {eachItem.phone}</p>
          <p>Address:- {eachItem.address}</p>
          <p>city:- {eachItem.city}</p>
          <p>state:- {eachItem.state}</p>
          <p>Pincode:- {eachItem.pinCode}</p>
        </li>
      ))}
    </ul>
  )

  const getAddressElement = () => (
    <div className="address-card-profile">
      <p className="text-profile">Address</p>
      <p className="address-text">
        Click here to
        <Link to="/add-address" className="add-address-link">
          add address
        </Link>
      </p>
      {userAddress.length > 0 ? (
        getListOfAddress()
      ) : (
        <p>No Address added yet</p>
      )}
    </div>
  )

  const getProfileIcons = () => (
    <ul className="profile-list-card">
      {profileList.map(eachItem => (
        <li className="each-profile" key={eachItem.id}>
          <button
            className="profile-each-btn"
            type="button"
            onClick={() => changeProfile(eachItem.imageUrl, eachItem.id)}
          >
            <img
              src={eachItem.imageUrl}
              alt="profile"
              className="each-profile-icon"
            />
          </button>
        </li>
      ))}
    </ul>
  )
  const getName = () => {
    const name = localStorage.getItem('username')
    const username = JSON.parse(name)
    const nameUser = username[0].toUpperCase() + username.slice(1)
    return nameUser
  }

  return (
    <>
      <Header />
      <div className="banner-Profile">
        <div className="card-for-name">
          <img
            src="https://res.cloudinary.com/dpcgriaf4/image/upload/v1692709685/tastyKitchen/Group_7420_fxulpm.png"
            alt="website logo"
            className="website-log-profile"
          />
          <h1 className="company-name-in-profile">Tasty Kitchens</h1>
        </div>
      </div>
      <div className="card-for-profile">
        <Popup
          modal
          trigger={
            <button className="btn-profile" type="button">
              <img src={profileUrl} alt="profile" className="profile-photo" />
            </button>
          }
        >
          {close => (
            <div className="popup-profile">
              <div className="btn-card-profile">
                <button
                  type="button"
                  className="btn-close-profile"
                  onClick={() => close()}
                >
                  <AiOutlineClose className="btn-icon-close-profile" />
                </button>
              </div>
              {getProfileIcons()}
              <button
                className="btn-remove-profile"
                type="button"
                onClick={removeProfile}
              >
                Remove
              </button>
            </div>
          )}
        </Popup>
        <div className="flex-name-badge">
          <AiFillStar className="badge" />
          <p className="name-user">{getName()}</p>
        </div>
      </div>
      <div className="details-card-profile">
        <hr className="ruler-profile" />
        {getFormEleForUserDetails()}
        {getAddressElement()}
        {/* <div className="cart-card-profile">
          <p className="cart-profile">Cart</p>
          <p className="address-text">
            Your cart contains{' '}
            <span className="cart-count-profile">
              {JSON.parse(localStorage.getItem('cartItemsList')).length}
            </span>{' '}
            items click here to{' '}
            <Link to="/cart" className="cart-profile-link">
              add
            </Link>
          </p>
        </div> */}
      </div>
      <Footer />
    </>
  )
}

export default Profile
