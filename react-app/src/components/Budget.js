import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import BudgetGroup from "./BudgetGroup";

import * as budgetActions from "../store/reducers/budget";

function Budget({ monthInt, yearInt }) {
  // Local state
  const [newGroupName, setNewGroupName] = useState("");

  // Hooks
  const dispatch = useDispatch();
  const budgetMonth = useSelector((x) => x.budget.budgetMonth);
  const history = useHistory();

  // Run ONLY on first render--gets requested budget month
  useEffect(() => {
    dispatch(budgetActions.getBudgetMonth({ monthInt, yearInt }));
  }, [history]);

  // Budget month create action
  const createNextBudgetMonth = (evt, copyPrevious) => {
    evt.preventDefault();
    const nextMonth =
      parseInt(budgetMonth.monthInt) === 12
        ? 1
        : parseInt(budgetMonth.monthInt) + 1;
    const nextYear =
      budgetMonth.monthInt === 12
        ? parseInt(budgetMonth.yearInt) + 1
        : parseInt(budgetMonth.yearInt);
    dispatch(
      budgetActions.createBudgetMonth({
        monthInt: budgetMonth.monthInt,
        yearInt: budgetMonth.yearInt,
        copyPrevious,
      })
    );
    history.push(`/budget?monthInt=${nextMonth}&yearInt=${nextYear}`);
    dispatch(
      budgetActions.getBudgetMonth({ monthInt: nextMonth, yearInt: nextYear })
    );
  };

  // Budget group create action
  const createBudgetGroup = () => {
    dispatch(
      budgetActions.createBudgetGroup({
        title: newGroupName,
        monthInt,
        yearInt,
      })
    );
    setNewGroupName("");
  };

  return (
    <div className="budget_page_container">
      <h1 className="budget_page_heading__month_title">{`Budget for ${budgetMonth.month}, ${budgetMonth.yearInt}`}</h1>
      <p>
        <img src="/images/blah.png"></img>
        <a
          href="/#"
          type="button"
          onClick={(evt) => createNextBudgetMonth(evt, true)}
        >
          Create a new budget month{" "}
        </a>{" "}
        from this month.
      </p>
      <strong>Budget Month:</strong> {budgetMonth.month}
      {budgetMonth.groups
        ? Object.keys(budgetMonth.groups).map((key) => (
            <BudgetGroup
              groupId={budgetMonth.groups[key].id}
              key={`budget-group-${budgetMonth.groups[key].id}`}
            />
          ))
        : ""}
      <div className="add_group_container">
        <button
          className="add_group_button"
          type="button"
          onClick={createBudgetGroup}
        >
          <span>+</span>Add Group
        </button>
        <input
          type="text"
          placeholder="Group name"
          onChange={(e) => setNewGroupName(e.target.value)}
        ></input>
      </div>
    </div>
  );
}

export default Budget;
