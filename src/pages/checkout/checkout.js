import React from 'react';

import './checkout.scss';

class Checkout extends React.Component {

  render() {

    return (
      <div id="Checkout">
        <div id="paginator">
        	<div className="pagination">Shipping Details</div>
        	<div className="pagination">Payment Details</div>
        	<div className="pagination">Final Confirmation</div>
        </div>
      </div>
    )
  }
}


export default Checkout;
