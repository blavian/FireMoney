import React, { useState } from "react"
import Transaction from "./Transaction"

function BudgetItem() {

    const [transactionDisplay, setTransactionDisplay] = useState(true)

    return (
        <div className="budget_group_items_container">
            <div className="budget_group_item">
                <div className="budget_item_title">
                    <span>Rent</span>
                </div>
                <div className="budget_item_description">
                    <span>Due at the first of the month</span>
                </div>
                <div className="budget_item_amount_budgeted">
                    <span>$1040.00</span>
                </div>
                <div className="budget_item_amount_spent">
                    <span>$00.00</span>
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