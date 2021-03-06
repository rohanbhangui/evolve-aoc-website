import React from 'react';
import footerLogo from '../../assets/images/footer-logo.svg';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './footer.scss';

class Footer extends React.Component {

  render() {
    return (
      <div id="Footer">
        <div id="footer-image">
          <Link to="/">
            <img src={footerLogo} alt="Evolve - The Art Of Creation"/>
          </Link>
        </div>
        <div className="flex-container">
          <div className="flex-item">
            <h6>Catalog</h6>
            <ul>
              <li>
                <Link to="catalog/#Hoodies">Hoodies</Link>
              </li>
              <li>
                <Link to="catalog/#Shirts">Shirts</Link>
              </li>
              <li>
                <Link to="catalog/">Pullovers</Link>
              </li>
            </ul>
          </div>
          <div className="flex-item">
            <h6>About</h6>
            <ul>
              <li>
                <a href="https://google.com">Blog</a>
              </li>
              <li>
                <a href="https://google.com">Philosophy</a>
              </li>
              <li>
                <a href="https://google.com">Mission Statement</a>
              </li>
              <li>
                <a href="https://google.com">The Team</a>
              </li>
            </ul>
          </div>
          <div className="flex-item">
            <h6>Support</h6>
            <ul>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <a href="https://google.com">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className="flex-item">
            <h6>Social</h6>
            <ul>
              <li>
                <a href="https://google.com"><i className="fab fa-twitter"></i>@EvolveAOC</a>
              </li>
              <li>
                <a href="https://google.com"><i className="fab fa-instagram"></i>@evolveaoc</a>
              </li>
              <li>
                <a href="https://google.com"><i className="fab fa-facebook"></i>Evolve AOC</a>
              </li>
            </ul>
          </div>
        </div>
        <div id="bottom-content">
          <h6>Proudly Made in Canada</h6>
          <p>1900 North Sheridan Way, Mississauga, Ontario, Canada | 123.456.7890</p>
          <p>&copy; 2019 Evolve AOC. All rights reserved. <Link to="/admin"><FontAwesomeIcon icon="cogs" /></Link></p>
        </div>
      </div>
    )
  }
}

export default Footer;
