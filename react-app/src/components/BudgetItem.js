import React, { useState } from "react";
import Transaction from "./Transaction";
import { useDispatch, useSelector } from "react-redux";

// import * as budgetActions from "../store/reducers/budget";

function BudgetItem({ groupId, itemId }) {
  // Local state
  const [transactionsAreVisible, setTransactionsAreVisible] = useState(false);

  // Hooks
  const budgetItem = useSelector((x) => x.budget.budgetMonth.groups[groupId].items[itemId]);
  const dispatch = useDispatch();

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
          <span>{budgetItem.expectedAmount}</span>
        </div>
        <div className="budget_item_amount_spent">
          <span>Not Implemented</span>
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
          {Object.keys(budgetItem.transactions).map((key) => (
            <Transaction
              transaction={budgetItem.transactions[key]}
              key={budgetItem.transactions[key].id}
            />
          ))}
        </div>
        <Transaction />
      </div>
    </div>
  );
}

export default BudgetItem;
