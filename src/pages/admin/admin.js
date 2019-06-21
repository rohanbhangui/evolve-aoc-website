import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import './admin.scss';
import 'react-table/react-table.css';

import SubComponent from './adminSubComponent/adminSubComponent';
import ReactTable from 'react-table';

import { SHIPPING_STATUS } from '../../utility/variables';

let db = firebase.firestore();

class Admin extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      transactions: []
    }
  }

  componentDidMount() {

    let component = this;

    let transactionsdb = db.collection("transactions");
    let listTransactions = fetch(`/admin/listTransactions`)
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
            firebaseTransactionInfo: firebaseTransaction
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

  render() {

    let { transactions } = this.state;
// 
//     const TRANSACTION_HEADERS = [
//       {
//         label: 'ID', name: 'id'
//       },
//       {
//         label: 'Date Created', name: 'created_at'
//       },
//       {
//         label: 'Amount (¢)', name: 'amount'
//       },
//       {
//         label: 'Currency', name: 'currency'
//       }
//     ];

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
        accessor: "firebaseTransactionInfo.status",
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
            onChange={event => onChange(event.target.value)}
            style={{ width: "100%" }}
            value={filter ? filter.value : "all"}
          >
            <option value="all">All</option>
            { Object.keys(SHIPPING_STATUS).map((key, i) => (
              <option value={key} key={i}>{SHIPPING_STATUS[key]}</option>
            ))}
          </select>
      }
      // {
      //   Header: "Amount (¢)",
      //   accessor: "amount",
      //   width: 100
      // },
      // {
      //   Header: "Currency",
      //   accessor: "currency",
      //   width: 100
      // }
    ]
    // prompt('Enter Admin Password');

    return (
      <div id="Admin">
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
              <SubComponent customerId={row.original.customer_id} orderId={row.original.order_id} transaction={row.original} firebaseTransaction={row.original.firebaseTransactionInfo} />
            )}
          }
        />
      </div>
    )
  }
}

export default Admin;
