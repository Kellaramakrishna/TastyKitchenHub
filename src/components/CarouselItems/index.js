import './index.css'

const CarouselItems = props => {
  const {eachItem} = props
  const {imageUrl} = eachItem

  return (
    <li>
      <img src={imageUrl} alt="offer" className="offer-img" />
    </li>
  )
}

export default CarouselItems
