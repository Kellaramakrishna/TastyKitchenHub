import {AiFillStar, AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import AddCartContext from '../../context/AddCartContext'

import './index.css'

const DetailsItems = props => {
  const {eachItem, isAddClickFun, index, decrementItem, incrementItem} = props

  const {id, name, cost, rating, imageUrl, isAdded, quantity} = eachItem

  return (
    <AddCartContext.Consumer>
      {value => {
        const {addToCart, incrementCart, decrementCart} = value
        const decrementFun = () => {
          decrementItem(id, quantity, decrementCart)
        }

        const incrementFun = () => {
          incrementItem(id, incrementCart)
        }

        const addClicked = () => {
          isAddClickFun(index, addToCart)
        }

        const getAddButton = () => (
          <button className="add-btn" type="button" onClick={addClicked}>
            ADD
          </button>
        )

        const getIncrementAndDecrement = () => (
          <div className="increment-dec-card">
            <button
              className="increment-btn"
              type="button"
              onClick={decrementFun}
            >
              <AiOutlineMinus className="increment-icon" />
            </button>
            <p className="quantity-text">{quantity}</p>
            <button
              className="increment-btn"
              type="button"
              onClick={incrementFun}
            >
              <AiOutlinePlus className="increment-icon" />
            </button>
          </div>
        )

        const getToggleButton = () => {
          if (isAdded === undefined) {
            return getAddButton()
          }
          return getIncrementAndDecrement()
        }

        return (
          <li className="each-details">
            <img src={imageUrl} alt={name} className="image-each-details" />
            <div className="review-card">
              <h1 className="name-style">{name}</h1>
              <div className="price-card">
                <BiRupee className="rupee" />
                <p className="price">{cost}.00</p>
              </div>
              <div className="price-card">
                <AiFillStar className="star" />
                <p className="rating">{rating}</p>
              </div>
              {getToggleButton()}
            </div>
          </li>
        )
      }}
    </AddCartContext.Consumer>
  )
}

export default DetailsItems
