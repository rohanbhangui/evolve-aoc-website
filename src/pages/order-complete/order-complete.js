import React from 'react';

import { PROJECT_NAME } from '../../utility/variables';

import './order-complete.scss';

class OrderComplete extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      orderObj: {},
      transaction: {}
    }

    this.totalCart = this.totalCart.bind(this);
  }

  componentDidMount() {
    let {
      location: {
        search
      }
    } = this.props;

    let component = this;

    fetch(`/verifyTransaction${search}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(transaction) {
      console.log("transaction" ,transaction);
      component.setState({
        transaction
      })

      fetch(`/retrieveOrder?orderId=${transaction.order_id}`)
      .then(function(resp) {
        return resp.json();
      })
      .then(function(json) {
        console.log("DEBUG", json);

        let order = json.orders[0];

        component.setState({
          order
        })


      });
    });

    document.title = `${PROJECT_NAME} - Order Completed!}`;

  }

  totalCart(items) {

    const total = items.map(item => item.qty*item.price).reduce((acc, cur) => acc + cur);

    return total.toFixed(2);
  }

  render() {

    let { checkoutId, transactionId } = this.props;

    let { order } = this.state;

    // console.log(orders);

    const SIZE_MAPPING = {
      S: 'Small',
      M: 'Medium',
      L: 'Large',
      XL: 'X-Large',
      XXL: 'XX-Large'
    };

    return (
      <div id="OrderComplete">
        <h4>Order Complete!</h4>
        { order && order.line_items && order.line_items.length > 0 && (
          <div id="cart-view">
            <div id="cart-items">
              { order.line_items && order.line_items.map((item, i) =>
                <div className={`cart-item ${ i === 0 ? 'border-top' : ''}`} key={i} data-id={ item.id } data-variant={ item.variant }>
                  <div className="horizontal-flex-container">
                    <div className="flex-item">
                      <h5>{item.quantity} &times; { item.name }</h5>
                      <div className="details">Colour: { item.variation_name }</div>
                      <div className="details">{ item.note }</div>
                    </div>
                    <div className="flex-item">
                      <div>{ `$${item.gross_sales_money.amount/100}` || "—" }</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="subtotals">
              <div className="cart-totals"><span>Sales Tax</span> <h5>${order.total_tax_money.amount/100 }</h5></div>
              <div className="cart-totals"><span>Subtotal</span> <h5>${(order.total_money.amount - order.total_tax_money.amount)/100 }</h5></div>
            </div>
            <div className="subtotals">
              <div className="cart-totals">
                <span><h4>Total</h4></span>
                <h5>${order.total_money.amount/100 }</h5>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}


export default OrderComplete;
