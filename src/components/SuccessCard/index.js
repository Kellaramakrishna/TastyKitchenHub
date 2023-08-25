import {Link} from 'react-router-dom'
import {TiTick} from 'react-icons/ti'

import './index.css'

const SuccessCard = () => (
  <>
    <div className="card-success">
      <div className="success-circle">
        <TiTick className="success-tick" />
      </div>
      <h1 className="success-heading">Payment Successful</h1>
      <p className="success-description">
        Thank you for ordering Your payment is successfully completed.
      </p>
      <Link to="/" className="gotToHomeLink">
        <button type="button" className="btn-success">
          Go To Home Page
        </button>
      </Link>
    </div>
  </>
)

export default SuccessCard
