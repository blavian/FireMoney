import React from "react"

function Transaction({transaction}) {
    const date = transaction.date.slice(0,16)
    return (
        <div className="item_transaction">
            <div className="transaction_title">
                <span>{transaction.title}</span>
            </div>
            <div className="transaction_date">
                <span>{date}</span>
            </div>
            <div className="transaction_amount">
                <span>{parseInt(transaction.amount).toFixed(2)}</span>
            </div>
        </div>
    )
}

export default Transaction;