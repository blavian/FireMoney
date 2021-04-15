import React, {useEffect} from 'react';
import Transaction from '../../Transaction/Transaction'
import * as sessionActions from "../../../store/reducers/session"
import { useDispatch, useSelector } from 'react-redux';

function TransactionsPage(){

    const dispatch = useDispatch();

    const user = useSelector((x) => x.session.user)
    const transactions = useSelector((x) => x.session.user.transactions)
    console.log(transactions)
    // console.log(Object.keys(transactions).length)
    // useEffect(() => {
    //     // uses query string to keep current month page on re-render
    //     dispatch(sessionActions.getUserTransactions(user.id))
    
    // }, [dispatch]);

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