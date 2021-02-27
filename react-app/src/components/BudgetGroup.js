import React, { useState } from "react";
import BudgetItem from "./BudgetItem";
import { useDispatch, useSelector } from "react-redux";

import * as budgetActions from "../store/reducers/budget";

function BudgetGroup({ groupId }) {
  // Local state
  const [newItemName, setNewItemName] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");
  const [newItemExpectedAmount, setNewItemExpectedAmount] = useState(0);
  const [newItemDueDate, setNewItemDueDate] = useState(0);

  // Hooks
  const budgetGroup = useSelector((x) => x.budget.budgetMonth.groups[groupId]);
  const dispatch = useDispatch();

    // Get a sum of all expected amounts from child items
    const getItemsExpectedAmountTotal = () => {
        let total = 0;
        for (const key in budgetGroup.items) {
            total += parseFloat(budgetGroup.items[key].expectedAmount);
        }
        return total;
    };

  // Budget item create action
  const createBudgetItem = () => {
    dispatch(
      budgetActions.createBudgetItem({
        title: newItemName,
        description: newItemDescription,
        expectedAmount: newItemExpectedAmount,
        dueDate: newItemDueDate,
        groupId,
      })
    );
    setNewItemName("");
  };

  return (
    <div className="budget_group_container">
      <div className="budget_group_heading_container">
        <div className="budget_group_heading budget_group_title">
          <h2>{budgetGroup.title}</h2>
        </div>
        <div className="budget_group_heading budget_group_amount">
          <h3>{getItemsExpectedAmountTotal()}</h3>
        </div>
        <div className="budget_group_heading budget_group_spent">
          <h3>Total Spent</h3>
        </div>
      </div>
      {budgetGroup.items
        ? Object.keys(budgetGroup.items).map((key) => (
            <BudgetItem 
            groupId={groupId}
            itemId={budgetGroup.items[key].id}
            key={`budget-item-${budgetGroup.items[key].id}`} />
          ))
        : ""}
      <div className="add_budget_item_container">
        <button
          type="button"
          className="add_budget_item_button"
          onClick={createBudgetItem}
        >
          ADD ITEM
        </button>
        <input
          type="text"
          placeholder="Item name"
          onChange={(e) => setNewItemName(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Item description"
          onChange={(e) => setNewItemDescription(e.target.value)}
        ></input>
        <input
          type="number"
          placeholder="Expected amount"
          onChange={(e) => setNewItemExpectedAmount(e.target.value)}
        ></input>
        <input
          type="date"
          placeholder="Due date"
          onChange={(e) => setNewItemDueDate(e.target.value)}
        ></input>
      </div>
    </div>
  );
}

export default BudgetGroup;
