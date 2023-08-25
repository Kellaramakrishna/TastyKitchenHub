import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dpcgriaf4/image/upload/v1692947921/tastyKitchen/erroring_1_notFOund_uyr41s.png"
      alt="not found"
      className="no-found"
    />
    <h1 className="no-order-heading">Page Not Found</h1>
    <p className="cart-empty-description">
      we are sorry, the page you requested could not be found
    </p>
    <Link to="/" className="goToHomeLink">
      <button className="button-order-now" type="button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
