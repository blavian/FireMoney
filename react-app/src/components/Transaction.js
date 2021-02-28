import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Transaction({ groupId, itemId, transactionId }) {


  const [updateItemView, setUpdateItemView] = useState(false);
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

  function updateItem(evt) {
    evt.preventDefault();
  }

  function deleteItem(evt) {
    evt.preventDefault();
    // dispatch(budgetActions.deleteBudgetItem({ id: budgetItem.id }));
    // dispatch(budgetActions.getBudgetMonth({}))
  }

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
            <span>${parseInt(transaction.amount).toFixed(2)}</span>
          </div>
          <div className="budget_item_buttons">
            {!updateItemView ?
              <>
                <button onClick={(evt) => setUpdateItemView(true)} type="button">Edit</button>
                <button onClick={(evt) => deleteItem(evt)} type="button">Delete</button>
              </>
              :
              <>
                <button onClick={(evt) => updateItem(evt)} type="button">Update</button>
                <button onClick={(evt) => setUpdateItemView(false)} type="button">Cancel</button>
              </>
            }
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Transaction;
