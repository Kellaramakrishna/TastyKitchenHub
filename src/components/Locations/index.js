import {MdLocationOn} from 'react-icons/md'
import './index.css'

const locationsList = [
  {
    id: 1,
    imageUrl:
      'https://res.cloudinary.com/dpcgriaf4/image/upload/v1694609122/tastyKitchen/1000_F_311512421_jHS5nUKdpy92DQXcdr0yIoniVj6yQyB0_bnt1eg.jpg',
    name: 'Hyderabad',
  },
  {
    id: 2,
    imageUrl:
      'https://res.cloudinary.com/dpcgriaf4/image/upload/v1694609222/tastyKitchen/photo-1582510003544-4d00b7f74220_yev2pp.jpg',
    name: 'Chennai',
  },
  {
    id: 3,
    imageUrl:
      'https://res.cloudinary.com/dpcgriaf4/image/upload/v1694609136/tastyKitchen/bandra-worli-sea-link_lcorsj.jpg',
    name: 'New Delhi',
  },
  {
    id: 4,
    imageUrl:
      'https://res.cloudinary.com/dpcgriaf4/image/upload/v1694609114/tastyKitchen/photo-1587474260584-136574528ed5_ucifzv.jpg',
    name: 'Mumbai',
  },
  {
    id: 5,
    imageUrl:
      'https://res.cloudinary.com/dpcgriaf4/image/upload/v1694609124/tastyKitchen/0e_twnjev.jpg',
    name: 'Banglore',
  },
  {
    id: 6,
    imageUrl:
      'https://res.cloudinary.com/dpcgriaf4/image/upload/v1694609393/tastyKitchen/chinese-fishing-net_78361-4665_byx8hm.jpg',
    name: 'Kochi',
  },
]

const Locations = () => (
  <div className="location-container">
    <hr />
    <div style={{display: 'flex'}}>
      <h1 className="location-heading">Available Locations</h1>
      <MdLocationOn className="locations-icon" />
    </div>
    <p className="location-description">
      At TastyKitchen, we are dedicated to bringing mouthwatering meals right to
      your doorstep. Our Delivery Available Cities section is your gateway to
      discovering whether we can deliver our delectable dishes to your location.
    </p>
    <ul className="location-list">
      {locationsList.map(eachItem => (
        <li className="list-location" key={eachItem.id}>
          <img
            src={eachItem.imageUrl}
            alt={eachItem.name}
            className="location-image"
          />
          <p className="location-name">{eachItem.name}</p>
        </li>
      ))}
    </ul>
  </div>
)

export default Locations
