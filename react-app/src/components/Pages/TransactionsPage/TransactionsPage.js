import React from 'react';
import Transaction from '../../Transaction/Transaction'
import { useSelector } from 'react-redux';

function TransactionsPage(){

    const user = useSelector((x) => x.session.user)
    const transactions = useSelector((x) => x.session.user.transactions)

    return (
        <div className="transactions_container">
            <h1 className="page_heading">Your Transactions</h1>
            {
                Object.keys(transactions).length > 0 ?

                (Object.keys(transactions).map(transaction => (
                    <Transaction transactionPage={true} key={transactions[transaction].id} transactionId={transactions[transaction].id}/>
                ))
                )
                :
                (
                    <h2>You currently do not have transactions</h2>
                )
            }
        </div>
    )
}

export default TransactionsPage;