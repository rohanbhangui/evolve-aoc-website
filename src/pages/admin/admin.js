import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import './admin.scss';
import 'react-table/react-table.css';

import SubComponent from './adminSubComponent/adminSubComponent';
import ReactTable from 'react-table';

import { SHIPPING_STATUS } from '../../utility/variables';

let db = firebase.firestore();
let transactionsdb = db.collection("transactions");

class Admin extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      transactions: [],
      authenticated: false,
      isRefreshed: false
    }

    this.submitHandler = this.submitHandler.bind(this);
    this.onShippingChange = this.onShippingChange.bind(this);
  }

  componentDidMount() {

    let component = this;
    
    fetch(`/admin/listTransactions`)
    .then(function(resp){
      return resp.json()
    })
    .then(function(json){

      let transactionsPromise = json.transactions.map((transaction, i) => {

        let firebaseTransactionInfo = transactionsdb.where("id", "==", `${transaction.id}`)
        .get()
        .then( querySnapshot => {
          return querySnapshot.docs.map(item => item.data())[0] || null; 
        });

        let newObj = Promise.all([firebaseTransactionInfo])
        .then(([firebaseTransaction]) => {
          return {
            created_at: transaction.created_at,
            order_id: transaction.order_id,
            id: transaction.id,
            amount: transaction.tenders[0].amount_money.amount,
            currency: transaction.tenders[0].amount_money.currency,
            customer_id: transaction.tenders[0].customer_id,
            card_details: transaction.tenders[0].card_details,
            firebaseTransactionInfo: firebaseTransaction,
            index: i
          }
        });

        return newObj;

      });

      Promise.all(transactionsPromise)
      .then(transactions => {
        component.setState({
          transactions
        })
      })
    });
  }

  submitHandler(e) {
    e.preventDefault();

    let formData = new FormData(e.target);

    fetch(`admin/authenticate?key=${formData.get('authKey')}`)
    .then(resp => {
      return resp.json();
    })
    .then(json => {
      if(json.authentication) {
        this.setState({
          authenticated: json.authentication
        });
      }
      else {
        alert("Authorization Failed");
      }
    });
  }

  onShippingChange(id, value) {

    let component = this;

    component.setState({
      isRefreshed: true
    });

    component.setState(prevState => {
      const newTransactions = prevState.transactions.map(transaction => {
        if (transaction.id !== id) {
          return transaction;
        }

        return {
          ...transaction,
          firebaseTransactionInfo: {
            ...transaction.firebaseTransactionInfo,
            status: value
          } 
        };
      });

      return {
        transactions: newTransactions
      };
    });
  }

  render() {

    let { transactions, authenticated } = this.state;

    const COLUMNS = [
      {
        Header: "Date Created",
        accessor: "created_at",
        width: 200,
        filterMethod: (filter, row) => {
          return row[filter.id].toLowerCase().includes(filter.value);
        }
      },
      {
        Header: "Transaction ID",
        accessor: "id",
        filterMethod: (filter, row) => {
          return row[filter.id].toLowerCase().includes(filter.value);
        }
      },
      {
        Header: "Order Status",
        id: 'status',
        accessor: d => {
          if(d.firebaseTransactionInfo) {
            return SHIPPING_STATUS[d.firebaseTransactionInfo.status];
          }

          return '';
        },
        width: 200,
        id: "status",
        filterMethod: (filter, row) => {
          if (filter.value === "all") {
            return true;
          }

          return row[filter.id] === filter.value;
        },
        Filter: ({ filter, onChange }) =>
          <select
            onChange={event => onChange(SHIPPING_STATUS[event.target.value])}
            style={{ width: "100%", height: "100%" }}
            value={filter ? filter.value : "all"}
          >
            <option value="all">All</option>
            { Object.keys(SHIPPING_STATUS).map((key, i) => (
              <option value={key} key={i}>{SHIPPING_STATUS[key]}</option>
            ))}
          </select>
      }
    ];

    return (
      <div id="Admin">
        { !authenticated && (
          <form onSubmit={this.submitHandler}>
            <input type="text" name="authKey" className="input" placeholder="Admin Authetication Key" required />
            <input type="submit" value="Submit" className="button primary" />
          </form>
        )}
        { authenticated && (
          <ReactTable
            data={transactions}
            columns={COLUMNS}
            filterable
            defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
            defaultPageSize={10}
            defaultSorted={[
              {
                id: "created_at",
                desc: true
              }
            ]}
            className="-striped -highlight"
            SubComponent={(row) => {
              return (
                <SubComponent isRefreshed={true} transaction={row.original} onShippingChange={this.onShippingChange} />
              )}
            }
          />
        )}
      </div>
    )
  }
}

export default Admin;
