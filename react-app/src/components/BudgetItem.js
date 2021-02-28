import React, { Component, useState } from "react";
import Transaction from "./Transaction";
import { useDispatch, useSelector } from "react-redux";
import {forceUpdate} from "react"

import * as budgetActions from "../store/reducers/budget";

function BudgetItem({ groupId, itemId }) {
  // Local state
  const [transactionsAreVisible, setTransactionsAreVisible] = useState(false);
  const [itemChange, setItemChange] = useState(false);

  // Hooks
  const budgetItem = useSelector((x) => x.budget.budgetMonth.groups[groupId].items[itemId]);
  const dispatch = useDispatch();

  let transactionTotal = 0;
  if(budgetItem){
    if (Object.keys(budgetItem.transactions).length) {
      transactionTotal = Object.keys(budgetItem.transactions).reduce((acc, key) => {
        return acc += parseFloat(budgetItem.transactions[key].amount)
      }, 0)
    }
  }
  else{
    return null
  }

  function updateItem(evt){
    evt.preventDefault();
  }

  function deleteItem(evt){
    evt.preventDefault();
    dispatch(budgetActions.deleteBudgetItem({id:budgetItem.id}));
    dispatch(budgetActions.getBudgetMonth({}))
  }

  return (
    <div className="budget_group_items_container">
      <div className="budget_group_item">
        <div className="budget_item_title">
          <span>{budgetItem.title}</span>
        </div>
        <div className="budget_item_description">
          <span>
            {budgetItem.description ? budgetItem.description : "No description"}
          </span>
        </div>
        <div className="budget_item_amount_budgeted">
          <span>{parseFloat(budgetItem.expectedAmount).toFixed(2)}</span>
        </div>
        <div className="budget_item_amount_spent">
          <span>{transactionTotal.toFixed(2)}</span>
        </div>
        <div className="budget_item_buttons">
            <button onClick={(evt) => updateItem(evt)} type="button">Update</button>
            <button onClick={(evt) => deleteItem(evt)} type="button">Delete</button>
        </div>
      </div>
      <div className="transaction_buttons">
        <button
          onClick={() => setTransactionsAreVisible(!transactionsAreVisible)}
        >
          View Transactions
          <span className="transaction_active">
            {transactionsAreVisible ? " -" : " +"}
          </span>
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
          <div className="transaction_heading transaction_amount">
            <h4>Transaction Date</h4>
          </div>
          <div className="transaction_heading transaction_spent">
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
  );
}

export default BudgetItem;
