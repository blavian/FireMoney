import React, { useState } from "react"
import Transaction from "./Transaction"

function BudgetItem({item}) {

    const [transactionDisplay, setTransactionDisplay] = useState(true)

    let transactionTotal = 0;
    
    if(Object.keys(item.transactions).length){
        console.log("item********** Loop",item.transactions)
        transactionTotal = Object.keys(item.transactions).reduce((acc,key) => {
            return acc += parseFloat(item.transactions[key].amount)
        },0)
    }

    return (
        <div className="budget_group_items_container">
            <div className="budget_group_item">
                <div className="budget_item_title">
                    <span>{item.title}</span>
                </div>
                <div className="budget_item_description">
                    <span>Due at the first of the month</span>
                </div>
                <div className="budget_item_amount_budgeted">
                    <span>{`$${parseInt(item.expectedAmount).toFixed(2)}`}</span>
                </div>
                <div className="budget_item_amount_spent">
                    <span>{`$${transactionTotal.toFixed(2)}`}</span>
                </div>
            </div>
            <div className="transaction_buttons">
                <button onClick={() => setTransactionDisplay(!transactionDisplay)}>
                    View Transactions
                    <span className="transaction_active">
                        {transactionDisplay ? " +" : " -"}
                    </span>
                </button>
            </div>
            <div className="item_transactions_container" style={ transactionDisplay ? {display:"none"} : {display:"block"} }>
                <div className="transaction_heading_container">
                    <div className="transaction_heading transaction_title">
                        <h4>Transaction Title</h4>
                    </div>
                    <div className="transaction_heading transaction_amount">
                        <h4>Transaction Date</h4>
                    </div>
                    <div className="transaction_heading transaction_spent">
                        <h4>Amount</h4>
                    </div>
                </div>
                <Transaction />
            </div>
        </div>
    )
}

export default BudgetItem;