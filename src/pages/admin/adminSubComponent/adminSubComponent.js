import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import Select from 'react-select';

import './adminSubComponent.scss';

import { SHIPPING_STATUS, SELECT_STYLES } from '../../../utility/variables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

let db = firebase.firestore();
let transactionsdb = db.collection("transactions");

class SubComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      customer: {},
      order: {}
    }

    this.onStatusChange = this.onStatusChange.bind(this);
  }

  componentDidMount() {

    let { transaction } = this.props;

    let { customer_id: customerId, order_id: orderId } = transaction;

    let component = this;

    fetch(`/retrieveCustomer?customerId=${customerId}`)
    .then(resp => {
      return resp.json();
    })
    .then(function(json) {

      component.setState({
        customer: json.customer
      });
    });

    fetch(`/retrieveOrder?orderId=${orderId}`)
    .then(resp => {
      return resp.json();
    })
    .then(json => {

      component.setState({
        order: json.orders[0]
      });
    });
  }

  onStatusChange(newValue) {

    let { transaction, onShippingChange } = this.props;
      
    transactionsdb.doc(transaction.firebaseTransactionInfo.id).set({
      status: newValue.value
    }, { merge: true });

    onShippingChange(transaction.firebaseTransactionInfo.id, newValue.value)
  }

  render() {

    let { transaction } = this.props;
    let { customer, order } = this.state;

    const SELECT_STATUS = Object.keys(SHIPPING_STATUS)
    .map((key, i) => {
      return { label: SHIPPING_STATUS[key], value: key };
    });

    const SELECTED_STATUS = SELECT_STATUS
    .findIndex((elem) => {
      return elem.value===transaction.firebaseTransactionInfo.status;
    });

    return (
      <div id="adminSubComponent">
        <div id="cart-info">
          { customer && customer.address && (
            <div id="customer-info">
              <div id="address-info">
                <h5>Shipping Address</h5>
                { customer.given_name && (<span><strong>Name:</strong> { customer.given_name }</span>) } { customer.family_name && (<span>{ customer.family_name }</span>) }
                { customer.email_address && (<p><strong>Email:</strong> { customer.email_address }</p>) }
                { customer.address && (<><br/><strong>Address:</strong></>)}
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
              <br/>
              <div id="fulfillment-info">
                <div id="shipping-status">
                  <Select
                    options={ SELECT_STATUS }
                    defaultValue={SELECT_STATUS[SELECTED_STATUS]}
                    isClearable={false}
                    isDisabled={false}
                    isLoading={false}
                    isRtl={false}
                    isSearchable={false}
                    styles={SELECT_STYLES}
                    onChange={this.onStatusChange}
                    name="status"
                    placeholder="Status"
                  />
                </div>
              </div>
              <br/>
              { transaction.firebaseTransactionInfo && transaction.firebaseTransactionInfo.status && (
                <div id="order-status">
                  <h5>Order Status</h5>

                  { transaction.firebaseTransactionInfo.status === "refunded" && (
                    <p id="refunded" className={`active`}>{SHIPPING_STATUS["refunded"]}</p>
                  )}
                  { transaction.firebaseTransactionInfo.status === "cancelled" && (
                    <p id="cancelled" className={`active`}>{SHIPPING_STATUS["cancelled"]}</p>
                  )}
                  { transaction.firebaseTransactionInfo.status !== "refunded" && transaction.firebaseTransactionInfo.status !== "cancelled" && Object.keys(SHIPPING_STATUS)
                    .filter(status => status !== "refunded" && status !== "cancelled")
                    .map((status, i) => (
                      <p id={status} key={i} className={`${status===transaction.firebaseTransactionInfo.status ? 'active' : ''}`}><FontAwesomeIcon icon="check" />{SHIPPING_STATUS[status]}</p>
                    )
                  )}
                </div>
              )}
            </div>
          )}
          { order && order.line_items && order.line_items.length > 0 && (
            <div id="sales-info">
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
                    <h5>${(order.total_money.amount/100).toFixed(2) }<br/><span>{transaction.card_details.card.card_brand} ending in {transaction.card_details.card.last_4}</span></h5>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div> 
      </div>
    )
  }
}


export default SubComponent;
