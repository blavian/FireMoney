import React, { useState } from "react";
import Transaction from "../Transaction/Transaction";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import * as budgetActions from "../../store/reducers/budget";
import { getTransactionModal } from "../../store/reducers/modal"
import "./BudgetItem.css"

function BudgetItem({ groupId, itemId }) {
  // Local state

  let transactionTotal = 0;
  const [transactionsAreVisible, setTransactionsAreVisible] = useState(false);

  // Hooks
  const budgetItem = useSelector((x) => x.budget.budgetMonth.groups[groupId].items[itemId]);

  // format for shown date
  function dateFormat(date){
    let newDate = moment(date).format("MMMM DD YYYY")
    return newDate
  }


  const [updateItemView, setUpdateItemView] = useState(false);
  const [updatedItemName, setUpdatedItemName] = useState(budgetItem? budgetItem.title : "");
  const [updatedItemDescription, setUpdatedItemDescription] = useState(budgetItem ? budgetItem.description : "");
  const [updatedItemAmount, setUpdatedItemAmount] = useState(budgetItem ?budgetItem.expectedAmount : "");
  const [updatedItemDate, setUpdatedItemDate] = useState(budgetItem ? budgetItem.dueDate : "" );


  // const [updatedItemName, setUpdatedItemName] = useState("");
  const dispatch = useDispatch();

  if (budgetItem) {
    if (Object.keys(budgetItem.transactions).length) {
      transactionTotal = Object.keys(budgetItem.transactions).reduce((acc, key) => {
        return acc += parseFloat(budgetItem.transactions[key].amount)
      }, 0)
    }
  }
  else {
    return null
  }
  // Hooks
  async function updateItem(evt) {
    evt.preventDefault();
    await dispatch(budgetActions.updateBudgetItem({ id: budgetItem.id,
                                              title: updatedItemName,
                                              description: updatedItemDescription,
                                              expectedAmount: updatedItemAmount,
                                              dueDate: updatedItemDate
                                            }));
    await setUpdateItemView(false)
    // await setUpdatedItemName("");
    // await setUpdatedItemDescription("");
    // await setUpdatedItemAmount("");
    // await setUpdatedItemDate("");
  }

  function deleteItem(evt) {
    evt.preventDefault();
    dispatch(budgetActions.deleteBudgetItem({ id: budgetItem.id }));
  }

  return (
    <>
    <div className="budget_group_items_container">
      <div className="budget_group_item">
        <div className="budget_item_title">
          {!updateItemView ?
            <span>{budgetItem.title}</span>
            : <input
              type="text"
              defaultValue={budgetItem.title}
              onChange={(e) => setUpdatedItemName(e.target.value)}
            ></input>
          }
        </div>
        <div className="budget_item_description">
          {!updateItemView ?
            <span>
              {budgetItem.description ? budgetItem.description : "No description"}
            </span>
            : <input
              type="text"
              defaultValue={budgetItem.description}
              onChange={(e) => setUpdatedItemDescription(e.target.value)}
            ></input>
          }
        </div>
        <div className="budget_item_Date">
          {!updateItemView ?
              <span>{dateFormat(budgetItem.dueDate)}</span>
            : <input
              type="date"
              defaultValue={budgetItem.dueDate}
              onChange={(e) => setUpdatedItemDate(e.target.value)}
            ></input>
          }
        </div>
        <div className="budget_item_amount_budgeted">
          {!updateItemView ?
            <span>${parseFloat(budgetItem.expectedAmount).toFixed(2)}</span>
            : <input
              type="text"
              defaultValue={parseFloat(budgetItem.expectedAmount).toFixed(2)}
              onChange={(e) => setUpdatedItemAmount(e.target.value)}
            ></input>
          }
        </div>
        <div className="budget_item_amount_spent">
          <span>${transactionTotal.toFixed(2)}</span>
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
      <div className="transaction_buttons">
        <button
          type="button"
          onClick={() => setTransactionsAreVisible(!transactionsAreVisible)}
        >
          View Transactions
          <span className="transaction_active">
            {transactionsAreVisible ? " -" : " +"}
          </span>
        </button>
        <button
          type="button"
            onClick={() => dispatch(getTransactionModal({ id: budgetItem.id }))}
          >
            Create Transaction
        </button>
      </div>

      <div
        className="item_transactions_container"
        style={
          transactionsAreVisible ? { display: "block" } : { display: "none" }
        }
      >
        <div className="transaction_heading_container">
          <div className="transaction_heading transaction_title">
            <h4>Transaction Title</h4>
          </div>
          <div className="transaction_heading transaction_date">
            <h4>Transaction Date</h4>
          </div>
          <div className="transaction_heading transaction_amount">
            <h4>Amount</h4>
          </div>
        </div>
        {budgetItem.transactions
          ? Object.keys(budgetItem.transactions).map((key) => (
            <Transaction
              groupId={groupId}
              itemId={itemId}
              transactionId={budgetItem.transactions[key].id}
              key={budgetItem.transactions[key].id}
            />
          ))
          : ""}
      </div>
    </div>
    </>
  );
}

export default BudgetItem;
