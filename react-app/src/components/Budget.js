import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import BudgetGroup from "./BudgetGroup";

import * as budgetActions from "../store/reducers/budget";


function Budget({ monthInt, yearInt }) {
  const budgetMonth = useSelector((x) => x.budget.budgetMonth);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(budgetActions.getBudgetMonth({ monthInt, yearInt }));
  }, [history]);

  // Budget month create action
  const createNextBudgetMonth = (evt, copyPrevious) => {
    // Prevents navigating to a fake link
    evt.preventDefault();
    // Handle year carryover
    const nextMonth =
      parseInt(budgetMonth.monthInt) === 12
        ? 1
        : parseInt(budgetMonth.monthInt) + 1;
    const nextYear =
      budgetMonth.monthInt === 12
        ? parseInt(budgetMonth.yearInt) + 1
        : parseInt(budgetMonth.yearInt);
    // Copy this month into a new month retaining groups and items
    dispatch(
      budgetActions.createBudgetMonth({
        monthInt: budgetMonth.monthInt,
        yearInt: budgetMonth.yearInt,
        copyPrevious,
      })
    );
    // Change location to new month
    history.push(`/budget?monthInt=${nextMonth}&yearInt=${nextYear}`);
    // Set new budget month
    dispatch(budgetActions.getBudgetMonth({ monthInt: nextMonth, yearInt: nextYear }));
  };

  // Budget group create action

  return (
    <div className="budget_page_container">
        <h1 className="budget_page_heading__month_title">{`Budget for ${budgetMonth.month}, ${budgetMonth.yearInt}`}</h1>
        <p>
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
        {Object.keys(budgetMonth.groups).map((key) => (
          <BudgetGroup
            id={budgetMonth.groups[key].id}
            key={`budget-group-${budgetMonth.groups[key].id}`}
          />
        ))}
        <div className="add_group_container">
          <button className="add_group_button" type="button"><span>+</span>Add Group</button>
        </div>
    </div>
  );
}

export default Budget;
