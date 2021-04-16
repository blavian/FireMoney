import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction, updateTransaction } from "../../store/reducers/budget";
import * as sessionActions from "../../store/reducers/session"
import "./Transaction.css"
import moment from 'moment';

function Transaction({ transactionPage, transactionId }) {
  
  const dispatch = useDispatch();

  const transactionItem = useSelector((x) => x.session.user.transactions[transactionId])
  const user = useSelector((x) => x.session.user)

  // format for shown date
  function dateFormat(date) {
    let newDate = moment(date).format("MMMM DD YYYY")
    return newDate
  }

  const [updateItemView, setUpdateItemView] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(true);
  const [updatedTitle, setUpdatedTitle] = useState(transactionItem ? transactionItem.title : "");
  const [updatedAmount, setUpdatedAmount] = useState(transactionItem ? transactionItem.amount : "");
  const [updatedDate, setUpdatedDate] = useState(transactionItem ? transactionItem.date : new Date());

  useEffect(() => {
    async function getTransactions() {
      await dispatch(sessionActions.getUserTransactions(user.id))
    }
    if (!contentLoaded){
      getTransactions();
    }
  }, [dispatch, contentLoaded])

  async function updateTrans(evt) {
    evt.preventDefault();
    const data = {
      id: transactionItem.id,
      title: updatedTitle,
      amount: updatedAmount,
      date: updatedDate
    }
    await dispatch(updateTransaction(data));
    await setUpdateItemView(false)
    await setContentLoaded(false)
  }

  async function deleteTrans(evt) {
    evt.preventDefault();
    const data = {
      id: transactionItem.id
    }
    await dispatch(deleteTransaction(data))
    await setContentLoaded(false)
  }

  return (
    <>
      {transactionItem ? (
        <div className="item_transaction" style={ transactionPage ? {'gridTemplateColumns':'1fr 1fr 1fr'} : null}>
          <div className="transaction_title">
            {updateItemView ?
              (
                <input
                  type="text"
                  defaultValue={transactionItem.title}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                ></input>
              ) :
              (
                <span>{transactionItem.title}</span>
              )
            }
          </div>
          <div className="transaction_date">
            {updateItemView ?
              (
                <input
                  type="date"
                  defaultValue={transactionItem.date}
                  onChange={(e) => setUpdatedDate(e.target.value)}
                ></input>
              ) :
              (
                <span>{dateFormat(transactionItem.date)}</span>
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
                <span>${parseFloat(transactionItem.amount).toFixed(2)}</span>
              )
            }
          </div>
          {
            !transactionPage &&
            <div className="budget_item_buttons">
              {
                !updateItemView ?
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
          }
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Transaction;
