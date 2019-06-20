import React from 'react';
import { Link } from 'react-router-dom';

import './admin.scss';
import 'react-table/react-table.css';

import ReactTable from 'react-table';

class Admin extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      transactions: []
    }
  }

  componentDidMount() {

    let component = this;

    fetch(`/admin/listTransactions`)
    .then(function(resp) {
      return resp.json();
    })
    .then(function(json) {

      let transactions = json.transactions.map((transaction, i) => {
        return {
          created_at: transaction.created_at,
          order_id: transaction.order_id,
          id: transaction.id,
          amount: transaction.tenders[0].amount_money.amount,
          currency: transaction.tenders[0].amount_money.currency,
          customerId: transaction.tenders[0].customerId
        }
      })

      component.setState({
        transactions
      });
    });
  }

  render() {

    let { transactions } = this.state;

    const TRANSACTION_HEADERS = [
      {
        label: 'ID', name: 'id'
      },
      {
        label: 'Date Created', name: 'created_at'
      },
      {
        label: 'Amount (¢)', name: 'amount'
      },
      {
        label: 'Currency', name: 'currency'
      }
    ];

    const COLUMNS = [
      {
        expander: true,
        Header: () => <strong>More</strong>,
        width: 65,
        Expander: ({ isExpanded, ...rest }) =>
        <div>
          { isExpanded ? <span>&#x2299;</span> : <span>&#x2295;</span>}
        </div>,
        style: {
          cursor: "pointer",
          fontSize: 25,
          padding: "0",
          textAlign: "center",
          userSelect: "none"
        }
      },
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Date Created",
        accessor: "created_at",
      },
      {
        Header: "Amount (¢)",
        accessor: "amount",
      },
      {
        Header: "Currency",
        accessor: "currency",
      }
    ]
    // prompt('Enter Admin Password');

    return (
      <div id="Admin">
        <ReactTable
          data={transactions}
          columns={COLUMNS}
          defaultPageSize={10}
          className="-striped -highlight"
          SubComponent={() => <div style={{padding: '10px'}}>Hello</div>}
        />
      </div>
    )
  }
}

export default Admin;
