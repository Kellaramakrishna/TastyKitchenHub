import {Link} from 'react-router-dom'
import {TiTick} from 'react-icons/ti'

const AddressSuccess = () => (
  <>
    <div className="card-success">
      <div className="success-circle">
        <TiTick className="success-tick" />
      </div>
      <h1 className="success-heading">Successfully Added Address</h1>
      <Link to="/profile" className="gotToHomeLink">
        <button type="button" className="btn-success">
          Back
        </button>
      </Link>
    </div>
  </>
)

export default AddressSuccess
