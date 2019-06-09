import React from 'react';
import { connect } from "react-redux";
import { removeFromCart } from '../../redux/actions/actions';
import { changeQuantity } from '../../redux/actions/actions';

import { PROJECT_NAME } from '../../utility/variables';


import './cart.scss';

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.totalCart = this.totalCart.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.totalQuantity = this.totalQuantity.bind(this);
    this.validateNumber = this.validateNumber.bind(this);
  }

  totalCart(cart) {

    const total = cart.map(item => item.qty*item.price).reduce((acc, cur) => acc + cur);

    return total.toFixed(2);
  }

  totalQuantity(cart) {
    return cart.map(item => item.qty).reduce((acc, cur) => acc + cur);
  }

  removeItem(payload) {

    const { removeFromCart } = this.props;
    
    return (e) => {
      removeFromCart(payload);
    }
  }

  changeQuantity(payload) {
    const { changeQuantity } = this.props;

    return (e) => {

      let qty = parseInt(e.target.value);

      if(!qty) {
        qty = 0;
      }
      else if(qty > 6) {
        qty = 6;

        e.target.value = qty;
      }

      changeQuantity({...payload, qty });
    }
  }

  totalQuantity(cart) {
    if(cart.length > 0) {
      return cart.map(item => item.qty).reduce((acc, cur) => acc + cur);
    }

    return 0;
  }

  validateNumber(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46) {
      return true;
    } else if ( key < 48 || key > 57 ) {
      return false;
    } else {
      return true;
    }
  };

  componentDidMount() {
    let { cart } = this.props;
    document.title = `${PROJECT_NAME} - Cart(${this.totalQuantity(cart)})`;
  }

  render() {

    let { cart } = this.props;

    const SIZE_MAPPING = {
      S: 'Small',
      M: 'Medium',
      L: 'Large',
      XL: 'X-Large',
      XXL: 'XX-Large'
    };

    return (
      <div id="Cart">
        <h4>Cart</h4>
        { cart.length > 0 && (
          <div id="cart-view">
            <div id="cart-items">
              { cart && cart.map((item, i) =>

                <div className={`cart-item ${ i > 0 ? 'border-top' : ''}`} key={i} data-id={ item.id } data-variant={ item.variant }>
                  <div className="item-image"> <img src={ item.image } alt={ `${ item.name } - ${ item.color }`} /></div>
                  <div className="item-content">
                    <div className="vertical-flex-container">
                      <div className="flex-item">
                        <div className="horizontal-flex-container">
                          <div className="flex-item">
                            <div><h5><strong>{ item.name }</strong></h5></div>
                            <div><strong>Colour:</strong> { item.color }</div>
                            <div><strong>Size:</strong> {SIZE_MAPPING[item.size]}</div>
                          </div>
                          <div className="flex-item">
                            <input className="input" type="text" pattern="\d*" maxlength="2" defaultValue={item.qty} onKeyPress={this.validateNumber} onBlur={ this.changeQuantity({ id: item.id, variant: item.variant, size: item.size}) }/>
                          </div>
                          <div className="flex-item">
                            <div>{ `$${(item.qty*item.price).toFixed(2)}` || "—" }</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-item">
                        <div className="item-remove">
                          <button className="link" onClick={ this.removeItem({ id: item.id, variant: item.variant, size: item.size})}>Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        { cart.length === 0 && (
          <div>Cart is empty</div>
        )}
      </div>
    )
  }
}


const mapStateToProps = state => {

  const {cart} = state;
  
  return { cart };
};

export default connect(mapStateToProps, { removeFromCart, changeQuantity })(Cart);
