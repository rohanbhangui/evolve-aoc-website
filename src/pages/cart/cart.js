import React from 'react';
import { connect } from "react-redux";
import { removeFromCart } from '../../redux/actions/actions';
import { changeQuantity } from '../../redux/actions/actions';

import { PROJECT_NAME } from '../../utility/variables';


import './cart.scss';

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postal: ''
    }

    this.totalCart = this.totalCart.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.totalQuantity = this.totalQuantity.bind(this);
    this.validateNumber = this.validateNumber.bind(this);
    this.pushToCheckout = this.pushToCheckout.bind(this);
    this.getTax = this.getTax.bind(this);
    this.processValues = this.processValues.bind(this);
  }

  totalCart(cart) {

    const total = cart.map(item => item.qty*item.price).reduce((acc, cur) => acc + cur);

    return total.toFixed(2);
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

  getTax(postal) {
    let { cart } = this.props;
    let component = this;

    return fetch(`/tax?postal=${postal}`)
    .then(function(resp) {
      return resp.json();
    })
    .then(function(myJson) {
      return (myJson.applicable * component.totalCart(cart)).toFixed(2);
    });
  }

  pushToCheckout(e) {
    let { cart } = this.props;

    let component = this;

    e.preventDefault();

    let formData = new FormData(e.target);

    let postal = formData.get("postal");

    this.processValues(postal).then(([tax]) => {

      // console.group("checkout items");
      // console.log("tax", tax);
      // console.log("total", this.totalCart(cart));
      // console.log("cart", cart);

      // let body = {
      //   idempotency_key: 'xxxx',
      //   order: {

      //   },
      //   ask_for_shipping_address: true,
      //   merchant_support_email: 'support@evolveaoc.com',
      //   redirect_url: 'https://localhost:3000/order-complete'
      // }
      // console.log("requestBody", body);
      // console.groupEnd();

      let data = {
        tax,
        cart,
        support_email: 'support@evolveaoc.com',
        total: this.totalCart(cart)
      }

      fetch('/checkout', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
      });
    })
  }

  processValues(postal) {
    return Promise.all([this.getTax(postal)]);
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
            { /*<div id="cart-item-header">
              <div className="flex-item">Item</div>
              <div className="flex-item" id="image-buffer">
                <div className="filler"></div>
              </div>
              <div className="flex-item" id="text-buffer">
                <div className="filler"></div>
              </div>
              <div className="flex-item">Qty</div>
              <div className="flex-item">Price</div>
            </div> */ }
            <div id="cart-items">
              { cart && cart.map((item, i) =>

                <div className={`cart-item ${ i === 0 ? 'border-top' : ''}`} key={i} data-id={ item.id } data-variant={ item.variant }>
                  <div className="horizontal-flex-container">
                    <div className="flex-item" id="remove">
                      <button onClick={ this.removeItem({ id: item.id, variant: item.variant, size: item.size})}>&times;</button>
                    </div>
                    <div className="flex-item" id="image">
                      <img src={ item.image } alt={ `${ item.name } - ${ item.color }`} />
                    </div>
                    <div className="flex-item">
                      <h5>{ item.name }</h5>
                      <div className="details">Colour: { item.color }</div>
                      <div className="details">Size: {SIZE_MAPPING[item.size]}</div>
                    </div>
                    <div className="flex-item">
                      <input className="input" type="text" pattern="\d*" maxLength="2" defaultValue={item.qty} onKeyPress={this.validateNumber} onBlur={ this.changeQuantity({ id: item.id, variant: item.variant, size: item.size}) }/>
                    </div>
                    <div className="flex-item">
                      <div>{ `$${(item.qty*item.price).toFixed(2)}` || "—" }</div>
                    </div>
                  </div>
                  { /*<div className="item-content">
                      <div className="flex-item">
                        <div className="item-remove">
                          <button className="link" onClick={ this.removeItem({ id: item.id, variant: item.variant, size: item.size})}>Remove</button>
                        </div>
                      </div> 
                  </div>*/}
                </div>
              )}
            </div>
            <div id="cart-total"><strong>Subtotal:</strong> <h5>{ this.totalCart(cart) }</h5></div>
            <div id="checkout-container">
            <form onSubmit={ this.pushToCheckout }>
              <input name="postal" className="input" type="text" placeholder="eg. A1A A1A" value={ this.state.postal } maxLength="10" pattern="[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]" onChange={ e => {
                this.setState({
                  postal: e.target.value
                });
              }}/>
              <input type="submit" disabled={ !this.state.postal ? 'disabled' : ''} className={ `button primary ${!this.state.postal ? 'disabled' : ''}`} id="checkout" value="Checkout" />
            </form>
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
