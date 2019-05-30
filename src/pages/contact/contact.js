import React from 'react';

import './contact.scss';

class Contact extends React.Component {

  render() {

    return (
      <div id="Contact">
        <div className="hero">
          <div className="hero-content">
            <h4>Have questions? Comments?</h4>
            <h2>Let us know!</h2>
          </div>
        </div>
        <div className="flex-container">
          <div className="flex-item">
            <div className="text-container">
              <h4>Business Inquiries</h4>
              <a class="h5" href="mailto:business@evolveaoc.com">business@evolveaoc.com</a>
            </div>
          </div>
          <div className="flex-item">
            <div className="text-container">
              <h4>Support</h4>
              <a class="h5" href="mailto:support@gmail.com">support@evolveaoc.com</a>
            </div>
          </div>
          <div className="flex-item">
            <div className="text-container">
              <h4>Social</h4>
              <a className="social" href="https://google.com"><i className="fab fa-twitter"></i></a>
              <a className="social" href="https://google.com"><i className="fab fa-instagram"></i></a>
              <a className="social" href="https://google.com"><i className="fab fa-facebook"></i></a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Contact;
