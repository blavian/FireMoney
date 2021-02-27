import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Transaction({ groupId, itemId, transactionId }) {
  // Hooks
  const transaction = useSelector((x) => {
    return groupId && itemId && transactionId
      ? x.budget.budgetMonth
        .groups[groupId]
        .items[itemId]
        .transactions[transactionId]
      : null;
  });
  // const dispatch = useDispatch();

  return (
    <>
      {transaction ? (
        <div className="item_transaction">
          <div className="transaction_title">
            <span>{transaction.title}</span>
          </div>
          <div className="transaction_date">
            <span>{transaction.date}</span>
          </div>
          <div className="transaction_amount">
            <span>{parseInt(transaction.amount).toFixed(2)}</span>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Transaction;
