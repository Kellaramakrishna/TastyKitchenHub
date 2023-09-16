import {useState} from 'react'
import {Link} from 'react-router-dom'
import AddCartContext from '../../context/AddCartContext'
import Header from '../Header'
import CartItems from '../CartItems'
import Footer from '../Footer'
import SuccessCard from '../SuccessCard'

import './index.css'

const Cart = () => {
  // used react hooks useState
  const [isBtnClicked, setBtn] = useState(false)

  return (
    <AddCartContext.Consumer>
      {value => {
        // accessing context value
        const {
          cartList,
          incrementCart,
          decrementCart,
          deleteCart,
          removeCart,
        } = value

        const orderNowBtn = () => {
          setBtn(true)
          removeCart()
        }

        const onIncrement = id => {
          incrementCart(id)
        }

        const onDecrement = id => {
          decrementCart(id)
        }

        const onDeleteCartItem = id => {
          deleteCart(id)
        }

        const getTotalPrice = () => {
          const listAmount = cartList.map(
            eachItem => eachItem.cost * eachItem.quantity,
          )

          const totalList = listAmount.reduce(
            (acc, currentValue) => acc + currentValue,
          )

          return totalList
        }

        const getEmptyCartList = () => (
          <div className="empty-card-container">
            <img
              src="https://res.cloudinary.com/dpcgriaf4/image/upload/v1692934043/tastyKitchen/cooking_1_emptyCart_s3vagr.png"
              alt="empty cart"
              className="empty-cart"
            />
            <h1 className="no-order-heading">No Order Yet!</h1>
            <p className="cart-empty-description">
              Your cart is empty. Add something from the menu.
            </p>
            <Link to="/" className="goToHomeLink">
              <button className="button-order-now" type="button">
                Order now
              </button>
            </Link>
          </div>
        )

        const getCartListItems = () => (
          <>
            <ul className="cart-items-list-in-cart">
              <ul className="header-column-names-list">
                <li className="top-each-list-item">items</li>
                <li className="top-each-list">Quantity</li>
                <li className="top-each-list">Price</li>
              </ul>
              {cartList.map(eachItem => (
                <CartItems
                  eachItem={eachItem}
                  key={eachItem.id}
                  onIncrement={onIncrement}
                  onDecrement={onDecrement}
                  onDeleteCartItem={onDeleteCartItem}
                />
              ))}
              <hr className="ruler" />
              <div className="total-price-card">
                <h1 className="order-total-text">Order Total:</h1>
                <div className="total-card">
                  <div>
                    <p className="total-amount">{getTotalPrice()}.00</p>
                    <button
                      className="order-button"
                      type="button"
                      onClick={orderNowBtn}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </ul>
            <Footer />
          </>
        )

        const getCartResults = () => (
          <>{cartList.length > 0 ? getCartListItems() : getEmptyCartList()}</>
        )

        const getSuccessCard = () => (
          <>
            <SuccessCard />
          </>
        )

        return (
          <>
            <Header />
            {isBtnClicked ? getSuccessCard() : getCartResults()}
          </>
        )
      }}
    </AddCartContext.Consumer>
  )
}

export default Cart
