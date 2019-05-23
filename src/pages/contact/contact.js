import React from 'react';

import './contact.scss';

class Contact extends React.Component {
	constructor(props) {
    super(props);

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(payload, qty) {
    return (e) => {
      e.preventDefault();

      const { addToCart, isSizeSelected, sizeRequiredHandler } = this.props;

      if(isSizeSelected) {
        //this is from redux
        addToCart(payload, qty);
      }
      else {
        sizeRequiredHandler();
      }
    }
  }

  render() {

    const { payload } = this.props;

    return (
      <div id="Contact">
        <h3>Have questions? Comments?<br/>Let us know!</h3>
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
              <a className="social" href="#"><i className="fab fa-twitter"></i></a>
              <a className="social" href="#"><i className="fab fa-instagram"></i></a>
              <a className="social" href="#"><i className="fab fa-facebook"></i></a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Contact;
