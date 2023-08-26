import {FaPinterestP, FaInstagram, FaTwitter, FaFacebookF} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-card">
    <div className="footer-logo-card">
      <img
        src="https://res.cloudinary.com/dpcgriaf4/image/upload/v1692858111/tastyKitchen/Frame_275_logo_dbqany.png"
        alt="website-footer-logo"
        className="footer-logo-img"
      />
      <h1 className="footer-name-company">Tasty Kitchen</h1>
    </div>
    <p className="footer-description">
      The only thing we are serious about is food. Contact us on
    </p>

    <ul className="footer-link-list">
      <li className="list-card-footer">
        <FaPinterestP className="footer-link-icon" />
      </li>
      <li className="list-card-footer-instagram">
        <FaInstagram className="footer-link-icon-instagram" />
      </li>
      <li className="list-card-footer-instagram">
        <FaTwitter className="footer-link-icon-instagram" />
      </li>
      <li className="list-card-footer-fb">
        <FaFacebookF className="footer-link-icon" />
      </li>
    </ul>
  </div>
)

export default Footer
