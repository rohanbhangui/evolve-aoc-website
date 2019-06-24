import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { PROJECT_NAME, SHIPPING_STATUS } from '../../utility/variables';
import { totalCart } from '../../utility/func';

import './order-complete.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

let db = firebase.firestore();

class OrderComplete extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      order: undefined,
      transaction: undefined,
      customer: undefined,
      firebaseTransactionInfo: undefined,
      newOrder: false,
    }

    this.totalCart = totalCart.bind(this);
  }

  componentDidMount() {
    let {
      location: {
        search
      },
      match
    } = this.props;

    let component = this;

    let transactionId = new URLSearchParams(search).get('transactionId') || match.params.id;
    let transactionsdb = db.collection("transactions");

    let firebaseTransactionInfo = transactionsdb.where("id", "==", `${transactionId}`)
    .get()
    .then( querySnapshot => {
      return querySnapshot.docs.map(item => item.data());
    });

    Promise.all([firebaseTransactionInfo]).then(([records]) => {
      if(records.length > 0) {
        this.setState({
          firebaseTransactionInfo: records[0]
        })
      } else {
        transactionsdb.doc(transactionId).set({
          id: transactionId,
          status: "received",
          tracking_number: '',
          tracking_url: ''
        });

        this.setState({
          newOrder: true,
        });
      }
    });

    fetch(`/verifyTransaction?transactionId=${transactionId}`)
    .then(response => {
      return response.json();
    })
    .then(transaction => {

      component.setState({
        transaction
      });

      fetch(`/retrieveCustomer?customerId=${transaction.tenders[0].customer_id}`)
      .then(resp => {
        return resp.json();
      })
      .then(json => {

        let customer = json.customer;

        component.setState({
          customer
        });
      });

      fetch(`/retrieveOrder?orderId=${transaction.order_id}`)
      .then(resp => {
        return resp.json();
      })
      .then(json => {
        let order = json.orders[0];

        component.setState({
          order
        });
      });
    });

    document.title = `${PROJECT_NAME} - Order Completed!`;

  }

  render() {

    let { order, transaction, customer, firebaseTransactionInfo, newOrder } = this.state;

    return (
      <div id="OrderComplete">
        { order && transaction && customer && (
          <>
            { newOrder && (
              <>
                <h4>Order Complete!</h4>
                <div id="thank-you-content">
                  <p>Thank you for your order. An email confirmation was sent to you at { customer && (<strong>{customer.email_address}</strong>)}. If you have any questions about your order, please contact us at <a href="mailto:support@evolveaoc.com">support@evolveaoc.com</a>.</p>
                </div>
              </>
            )}
            { !newOrder && (
              <>
                <h4>Order Confirmation</h4>
                <div id="thank-you-content">
                  <p>If you have any questions about your order, please contact us at <a href="mailto:support@evolveaoc.com">support@evolveaoc.com</a>.</p>
                </div>
              </>
            )}
            <div id="cart-info">
              { customer && customer.address && (
                <div id="customer-info">
                  <div id="address-info">
                    <h5>Shipping Address</h5>
                    { customer.given_name && (<span>{ customer.given_name }</span>) } { customer.family_name && (<span>{ customer.family_name }</span>) }
                    { customer.email_address && (<p>{ customer.email_address }</p>) }
                    { customer.address.organization && (<p>{ customer.address.organization }</p>) }
                    { customer.address.address_line_1 && (<p>{ customer.address.address_line_1 }</p>) }
                    { customer.address.address_line_2 && (<p>{ customer.address.address_line_2 }</p>) }
                    { customer.address.address_line_3 && (<p>{ customer.address.address_line_3 }</p>) }
                    { customer.address.locality && (<span>{ customer.address.locality }, </span>) }
                    { customer.address.sublocality && (<span>{ customer.address.sublocality }, </span>) }
                    { customer.address.sublocality_2 && (<span>{ customer.address.sublocality_2 }, </span>) }
                    { customer.address.sublocality_3 && (<span>{ customer.address.sublocality_3 }, </span>) }
                    { customer.address.administrative_district_level_3 && (<span>{ customer.address.administrative_district_level_3 }, </span>) }
                    { customer.address.administrative_district_level_2 && (<span>{ customer.address.administrative_district_level_2 }, </span>) }
                    { customer.address.administrative_district_level_1 && (<span>{ customer.address.administrative_district_level_1 }, </span>) }
                    { customer.address.country && (<span>{ customer.address.country }</span>) }
                    { customer.address.postal_code && (<p>{ customer.address.postal_code }</p>) }
                  </div>
                  <br/>
                  { firebaseTransactionInfo && firebaseTransactionInfo.status && (
                    <div id="order-status">
                      <h5>Order Status</h5>

                      { firebaseTransactionInfo.status === "refunded" && (
                        <p id="refunded" className={`active`}>{SHIPPING_STATUS["refunded"]}</p>
                      )}
                      { firebaseTransactionInfo.status === "cancelled" && (
                        <p id="cancelled" className={`active`}>{SHIPPING_STATUS["cancelled"]}</p>
                      )}
                      { firebaseTransactionInfo.status !== "refunded" && firebaseTransactionInfo.status !== "cancelled" && Object.keys(SHIPPING_STATUS)
                        .filter(status => status !== "refunded" && status !== "cancelled")
                        .map((status, i) => (
                          <p id={status} key={i} className={`${status===firebaseTransactionInfo.status ? 'active' : ''}`}><FontAwesomeIcon icon="check" />{SHIPPING_STATUS[status]}</p>
                        )
                      )}
                    </div>
                  )}
                </div>
              )}
              { order && order.line_items && order.line_items.length > 0 && (
                <div id="cart-view">
                  <div id="cart-items">
                    { order.line_items && order.line_items.map((item, i) =>
                      <div className={`cart-item`} key={i} data-id={ item.id } data-variant={ item.variant }>
                        <div className="horizontal-flex-container">
                          <div className="flex-item">
                            <h5>{item.quantity} &times; { item.name }</h5>
                            <div className="details">Colour: { item.variation_name }</div>
                            <div className="details">{ item.note }</div>
                          </div>
                          <div className="flex-item">
                            <div>{ `$${(item.gross_sales_money.amount/100).toFixed(2)}` || "—" }</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="subtotals">
                    { order.total_discount_money.amount > 0 && (
                      <div className="cart-totals"><span>Discounts</span> <h5>${(order.total_discount_money.amount/100).toFixed(2) }</h5></div>
                    )}
                    <div className="cart-totals"><span>Sales Tax</span> <h5>${(order.total_tax_money.amount/100).toFixed(2) }</h5></div>              
                    <div className="cart-totals"><span>Subtotal</span> <h5>${((order.total_money.amount - order.total_tax_money.amount - order.total_discount_money.amount)/100).toFixed(2) }</h5></div>
                  </div>
                  <div className="subtotals">
                    <div className="cart-totals">
                      <span><h4>Total</h4></span>
                      <h5>${(order.total_money.amount/100).toFixed(2) }<br/><span>{transaction.tenders[0].card_details.card.card_brand} ending in {transaction.tenders[0].card_details.card.last_4}</span></h5>
                    </div>
                  </div>
                  <div id="order-number">Order ID: { order && order.id }</div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    )
  }
}


export default OrderComplete;
