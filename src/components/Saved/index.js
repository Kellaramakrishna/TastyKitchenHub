import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import {AiFillStar, AiFillDelete} from 'react-icons/ai'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const Saved = () => {
  const [listSaved, setSavedList] = useState([])

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem('saved'))
    if (savedList === null) {
      setSavedList([])
    } else {
      setSavedList(savedList)
    }
  }, [])

  const removeSavedItem = id => {
    const filteredList = listSaved.filter(eachItem => eachItem.id !== id)
    localStorage.setItem('saved', JSON.stringify(filteredList))

    setSavedList(filteredList)
  }

  const getNoSavedItems = () => (
    <div className="empty-card-container">
      <h1 className="no-order-heading">No Items Saved Yet</h1>
      <p className="cart-empty-description">You can save your items here.</p>
      <Link to="/" className="goToHomeLink">
        <button className="button-order-now" type="button">
          back
        </button>
      </Link>
    </div>
  )

  const getSavedListItems = () => (
    <>
      <ul className="saved-list">
        {listSaved.map(eachItem => (
          <li className="each-details">
            <img
              src={eachItem.imageUrl}
              alt={eachItem.name}
              className="image-each-details"
            />
            <div className="review-card" style={{alignSelf: 'center'}}>
              <h1 className="name-style">{eachItem.name}</h1>
              <div className="price-card">
                <BiRupee className="rupee" />
                <p className="price">{eachItem.cost}.00</p>
              </div>
              <div className="price-card">
                <AiFillStar className="star" />
                <p className="rating">{eachItem.rating}</p>
              </div>
              <div className="delete-saved-container">
                <button
                  className="delete-saved-item"
                  type="button"
                  onClick={() => removeSavedItem(eachItem.id)}
                >
                  <AiFillDelete className="delete-saved-icon" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Footer />
    </>
  )

  return (
    <>
      <Header />
      {listSaved.length === 0 ? getNoSavedItems() : getSavedListItems()}
    </>
  )
}

export default Saved
