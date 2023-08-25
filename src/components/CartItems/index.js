import {AiOutlineMinus, AiOutlinePlus, AiOutlineClose} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'

import './index.css'

const CartItems = props => {
  const {eachItem, onIncrement, onDecrement, onDeleteCartItem} = props
  const {id, cost, quantity, imageUrl, name} = eachItem

  const decrementFun = () => {
    if (quantity > 1) {
      onDecrement(id)
    }
  }

  const incrementFun = () => {
    onIncrement(id)
  }

  const deleteBtn = () => {
    onDeleteCartItem(id)
  }

  const getIncrementAndDecrement = () => (
    <div className="increment-dec-card">
      <button
        className="increment-btn-cart"
        type="button"
        onClick={decrementFun}
      >
        <AiOutlineMinus className="increment-icon" />
      </button>
      <p className="quantity-text-cart">{quantity}</p>
      <button
        className="increment-btn-cart"
        type="button"
        onClick={incrementFun}
      >
        <AiOutlinePlus className="increment-icon" />
      </button>
    </div>
  )

  return (
    <li className="list-items-in-cart">
      <div className="card-cart">
        <img src={imageUrl} alt={name} className="img-in-cart" />
        <p className="name-in-cart">{name}</p>
      </div>
      <div className="quantity-card">{getIncrementAndDecrement()}</div>
      <div className="price-cart-card">
        <BiRupee className="rupee-cart" />
        <p className="price-cart">{cost * quantity}.00</p>
      </div>
      <div className="button-close">
        <button type="button" className="close-btn" onClick={deleteBtn}>
          <AiOutlineClose className="close-icon" />
        </button>
      </div>

      <div className="price-cart-card-mobile">
        <p className="name-in-cart-mobile">{name}</p>
        {getIncrementAndDecrement()}
        <div className="flex-mobile-cart">
          <BiRupee className="rupee-cart" />
          <p className="price-cart">{cost * quantity}.00</p>
        </div>
      </div>
    </li>
  )
}

export default CartItems
