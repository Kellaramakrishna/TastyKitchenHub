import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import RestaurantDetails from './components/RestaurantDetails'
import ProtectedRoute from './components/ProtectedRoute'
import AddCartContext from './context/AddCartContext'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import Profile from './components/Profile'
import Form from './components/Form'
import './App.css'

class App extends Component {
  state = {cartList: []}

  componentDidMount() {
    const data = localStorage.getItem('cartItemsList')
    const parsedData = JSON.parse(data)
    if (data !== null) {
      this.setState({cartList: parsedData})
    }
  }

  addCartToLocalStorage = () => {
    const {cartList} = this.state
    const newList = cartList.map(eachItem => ({
      id: eachItem.id,
      quantity: eachItem.quantity,
      imageUrl: eachItem.imageUrl,
      name: eachItem.name,
      cost: eachItem.cost,
    }))
    localStorage.setItem('cartItemsList', JSON.stringify(newList))
  }

  addToCart = newItem => {
    this.setState(
      prevState => ({cartList: [...prevState.cartList, newItem]}),
      this.addCartToLocalStorage,
    )
  }

  incrementCart = id => {
    this.setState(
      prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.id === id) {
            return {
              ...eachItem,
              quantity: eachItem.quantity + 1,
            }
          }
          return eachItem
        }),
      }),
      this.addCartToLocalStorage,
    )
  }

  decrementCart = id => {
    this.setState(
      prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.id === id) {
            return {
              ...eachItem,
              quantity: eachItem.quantity - 1,
            }
          }
          return eachItem
        }),
      }),
      this.addCartToLocalStorage,
    )
  }

  deleteCart = id => {
    this.setState(
      prevState => ({
        cartList: prevState.cartList.filter(eachItem => eachItem.id !== id),
      }),
      this.addCartToLocalStorage,
    )
  }

  removeCart = () => {
    this.setState({cartList: []}, this.addCartToLocalStorage)
  }

  render() {
    const {cartList} = this.state
    return (
      <>
        <AddCartContext.Provider
          value={{
            cartList,
            addToCart: this.addToCart,
            incrementCart: this.incrementCart,
            decrementCart: this.decrementCart,
            deleteCart: this.deleteCart,
            removeCart: this.removeCart,
          }}
        >
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute
              exact
              path="/restaurant/:id"
              component={RestaurantDetails}
            />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <ProtectedRoute exact path="/profile" component={Profile} />
            <ProtectedRoute exact path="/add-address" component={Form} />
            <Route component={NotFound} />
          </Switch>
        </AddCartContext.Provider>
      </>
    )
  }
}

export default App
