import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import Header from '../Header'
import Footer from '../Footer'
import AddressSuccess from '../AddressSuccess'
import './index.css'

const empty = ''

const Form = () => {
  const [nameForm, setNameForm] = useState('')
  const [emailForm, setEmailForm] = useState('')
  const [addressForm, setAddress] = useState('')
  const [cityName, setCity] = useState('')
  const [pinCode, setPinCode] = useState('')
  const [state, setState] = useState('')
  const [phone, setPhone] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [success, setSuccess] = useState(false)

  const nameInput = event => {
    setNameForm(event.target.value)
  }

  const emailInput = event => {
    setEmailForm(event.target.value)
  }

  const addressInput = event => {
    setAddress(event.target.value)
  }

  const cityInput = event => {
    setCity(event.target.value)
  }

  const pinCodeInput = event => {
    setPinCode(event.target.value)
  }

  const stateInput = event => {
    setState(event.target.value)
  }

  const phoneInput = event => {
    setPhone(event.target.value)
  }

  const formSubmitDetails = event => {
    event.preventDefault()

    if (
      nameForm === '' ||
      emailForm === '' ||
      addressForm === '' ||
      phone === '' ||
      pinCode === '' ||
      state === '' ||
      cityName === ''
    ) {
      setErrorMsg('Please fill all the above details')
    } else {
      const userDetails = {
        id: uuidv4(),
        name: nameForm,
        email: emailForm,
        address: addressForm,
        phone,
        pinCode,
        state,
        city: cityName,
      }

      const data = localStorage.getItem('user_details')
      const parsedData = JSON.parse(data) || []
      parsedData.push(userDetails)
      localStorage.setItem('user_details', JSON.stringify(parsedData))

      setSuccess(true)
    }
  }

  const getFormEle = () => (
    <form className="form-for-user-details" onSubmit={formSubmitDetails}>
      <div className="card-for-input">
        <label className="label-form" htmlFor="Name">
          Name
        </label>
        <input
          type="text"
          id="Name"
          value={nameForm}
          className="input-form"
          placeholder="Enter Name"
          onChange={nameInput}
        />
      </div>
      <div className="flex-city-state">
        <div className="card-city-name">
          <label className="label-form" htmlFor="Email">
            Email
          </label>
          <input
            type="text"
            id="Email"
            value={emailForm}
            className="input-form"
            placeholder="Enter Email"
            onChange={emailInput}
          />
        </div>
        <div className="card-city-name">
          <label className="label-form" htmlFor="phone">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            value={phone}
            className="input-form"
            placeholder="Enter Phone No"
            onChange={phoneInput}
          />
        </div>
      </div>
      <div className="card-for-input">
        <label className="label-form" htmlFor="Address">
          Address
        </label>
        <textarea
          type="text"
          id="Address"
          value={addressForm}
          className="textarea-form"
          placeholder="Enter Address"
          onChange={addressInput}
        >
          {empty}
        </textarea>
      </div>
      <div className="flex-city-state">
        <div className="card-city-name">
          <label className="label-form" htmlFor="city">
            City
          </label>
          <input
            type="text"
            id="city"
            value={cityName}
            className="input-form"
            placeholder="Enter City"
            onChange={cityInput}
          />
        </div>
        <div className="card-city-name">
          <label className="label-form" htmlFor="state">
            State
          </label>
          <input
            type="text"
            id="state"
            value={state}
            className="input-form"
            placeholder="Enter State"
            onChange={stateInput}
          />
        </div>
      </div>
      <div className="card-for-input">
        <label className="label-form" htmlFor="pinCode">
          Pincode
        </label>
        <input
          type="text"
          id="pinCode"
          value={pinCode}
          className="input-form"
          placeholder="Enter Pincode"
          onChange={pinCodeInput}
        />
      </div>
      <button className="btn-form-submit" type="submit">
        Submit
      </button>
      {errorMsg !== '' ? <p className="error-msg-form">*{errorMsg}</p> : null}
    </form>
  )

  const getForm = () => (
    <>
      <div className="heading-form">
        <h1 className="form-heading">Fill Details</h1>
      </div>
      {getFormEle()}
      <Footer />)
    </>
  )

  return (
    <>
      <Header />
      {success ? <AddressSuccess /> : getForm()}
    </>
  )
}

export default Form
