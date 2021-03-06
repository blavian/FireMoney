import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction, updateTransaction } from "../store/reducers/budget";

function Transaction({ groupId, itemId, transactionId }) {

  const dispatch = useDispatch();

  const transactionItem = useSelector((x) => x.budget.budgetMonth.groups[groupId].items[itemId].transactions[transactionId])

  let transactionItemDate = transactionItem ? new Date(transactionItem.date) : "";
  let transactionItemDateInput;
  if (transactionItemDate){
    const transactionItemMonth = transactionItemDate.getMonth() < 10 ? `0${transactionItemDate.getMonth()}` : transactionItemDate.getMonth();
    const transactionItemDay = transactionItemDate.getDay() < 10 ? `0${transactionItemDate.getDay()}` : transactionItemDate.getDay();
    transactionItemDateInput = `${transactionItemDate.getFullYear()}-${transactionItemMonth}-${transactionItemDay}`;
  }

  const [updateItemView, setUpdateItemView] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(transactionItem ? transactionItem.title : "");
  const [updatedAmount, setUpdatedAmount] = useState(transactionItem ? transactionItem.amount : "");
  const [updatedDate, setUpdatedDate] = useState(transactionItemDate);
  // Hooks
  const transaction = useSelector((x) => {
    return groupId && itemId && transactionId
      ? x.budget.budgetMonth
        .groups[groupId]
        .items[itemId]
        .transactions[transactionId]
      : null;
  });

  function updateTrans(evt) {
    evt.preventDefault();
    const data = {
      id: transactionItem.id,
      title: updatedTitle,
      amount: updatedAmount,
      date: updatedDate
    }
    // console.log(data);
    dispatch(updateTransaction(data));
    setUpdateItemView(false)
  }

  function deleteTrans(evt) {
    evt.preventDefault();
    const data = {
      id: transactionItem.id
    }
    dispatch(deleteTransaction(data))
  }

  return (
    <>
      {transaction ? (
        <div className="item_transaction">
          <div className="transaction_title">
            { updateItemView ?
              (
                <input
                  type="text"
                  defaultValue={transactionItem.title}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                ></input>
              ):
              (
                <span>{transaction.title}</span>
              )
            }
          </div>
          <div className="transaction_date">
            {updateItemView ?
              (
                <input
                  type="date"
                  defaultValue={transactionItemDateInput}
                  onChange={(e) => setUpdatedDate(e.target.value)}
                ></input>
              ) :
              (
                <span>{transactionItemDate.toDateString()}</span>
              )
            }
          </div>
          <div className="transaction_amount">
            {updateItemView ?
              (
                <input
                  type="text"
                  defaultValue={parseFloat(transactionItem.amount).toFixed(2)}
                  onChange={(e) => setUpdatedAmount(e.target.value)}
                ></input>
              ) :
              (
                <span>${parseInt(transaction.amount).toFixed(2)}</span>
              )
            }
          </div>
          <div className="budget_item_buttons">
            {!updateItemView ?
              <>
                <button onClick={(evt) => setUpdateItemView(true)} type="button">Edit</button>
                <button onClick={(evt) => deleteTrans(evt)} type="button">Delete</button>
              </>
              :
              <>
                <button onClick={(evt) => updateTrans(evt)} type="button">Update</button>
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
