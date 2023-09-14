import './index.css'

const HowItWorks = () => (
  <div className="How-it-Works-container">
    <hr />
    <h1 className="HIW-heading">How It Works</h1>
    <div className="card-1-HIW">
      <div className="inner-card-1-HIW">
        <div style={{alignSelf: 'flex-start'}}>
          <h1 className="hiw-heading-style">Discover Restaurants:</h1>
        </div>
        <p className="description-HIW-small">
          Find your perfect dining spot, from cozy cafes to fine dining, with
          our extensive restaurant listings. Explore menus and reviews for
          informed choices.
        </p>
        <p className="description-HIW-large">
          Browse through an extensive list of restaurants in your area. Whether
          you are in the mood for a cozy cafe, a fine dining experience, or a
          quick bite, our platform helps you find the perfect place to eat.
          Explore restaurant profiles, check out menus, and read reviews to make
          informed choices.
        </p>
      </div>
      <div className="inner-card-image-container">
        <img
          src="https://res.cloudinary.com/dpcgriaf4/image/upload/v1694658148/tastyKitchen/13416120_5212927_xv8nvl.jpg"
          alt="search restaurant"
          className="HIW-image"
        />
      </div>
    </div>

    <div className="card-1-HIW">
      <div className="inner-card-image-container">
        <img
          src="https://res.cloudinary.com/dpcgriaf4/image/upload/v1694659293/tastyKitchen/16485210_5739256_znsvrd.jpg"
          alt="search restaurant"
          className="HIW-image"
        />
      </div>
      <div className="inner-card-1-HIW">
        <div style={{alignSelf: 'flex-start'}}>
          <h1 className="hiw-heading-style">Online Ordering:</h1>
        </div>
        <p className="description-HIW-small">
          Enjoy your favorite dishes from home with seamless delivery or takeout
          options. Savor your preferred cuisine hassle-free.
        </p>
        <p className="description-HIW-large">
          Enjoy the convenience of ordering your favorite dishes for delivery or
          takeout. TastyKitchens offers a seamless online ordering experience,
          allowing you to savor your preferred cuisine from the comfort of your
          home.
        </p>
      </div>
    </div>

    <div className="card-1-HIW">
      <div className="inner-card-1-HIW">
        <div style={{alignSelf: 'flex-start'}}>
          <h1 className="hiw-heading-style">Location-Based Recommendations:</h1>
        </div>
        <p className="description-HIW-small">
          Discover nearby dining options effortlessly. Just enter your location
          to access curated restaurant lists.
        </p>
        <p className="description-HIW-large">
          Use our location-based feature to discover dining options near you.
          Just enter your location, and we will provide you with a curated list
          of restaurants, food trucks, and eateries in your vicinity.
        </p>
      </div>
      <div className="inner-card-image-container">
        <img
          src="https://res.cloudinary.com/dpcgriaf4/image/upload/v1694659487/tastyKitchen/6982750_3333449_1_v7lme3.jpg"
          alt="search restaurant"
          className="HIW-image"
        />
      </div>
    </div>

    <div className="card-1-HIW">
      <div className="inner-card-image-container">
        <img
          src="https://res.cloudinary.com/dpcgriaf4/image/upload/v1694660124/tastyKitchen/13899911_5393073_kqehj0.jpg"
          alt="search restaurant"
          className="HIW-image"
        />
      </div>
      <div className="inner-card-1-HIW">
        <div style={{alignSelf: 'flex-start'}}>
          <h1 className="hiw-heading-style">User Reviews and Ratings:</h1>
        </div>
        <p className="description-HIW-small">
          Make confident dining decisions by reading reviews and checking
          ratings. Share your experiences to help fellow foodies.
        </p>
        <p className="description-HIW-large">
          Make dining decisions with confidence by reading user reviews and
          checking restaurant ratings. Share your own experiences to help others
          in the TastyKitchens community discover hidden gems or avoid
          disappointing meals.
        </p>
      </div>
    </div>
  </div>
)

export default HowItWorks
