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
  }, []);

  const createNextBudgetMonth = (evt, copyPrevious) => {
    // Prevents navigating to a fake link
    evt.preventDefault();
    // Handle year carryover
    const nextMonth = budgetMonth.monthInt === 12 ? 1 : budgetMonth.monthInt;
    const nextYear =
      budgetMonth.monthInt === 12 ? budgetMonth.year + 1 : budgetMonth.year;
    // Copy this month into a new month retaining groups and items
    dispatch(
      budgetActions.createBudgetMonth({
        monthInt,
        yearInt,
        copyPrevious: true,
      })
    );
    // Change location to new month
    history.push(`/budget?monthInt=${nextMonth}&yearInt=${nextYear}`);
  };


function Budget({ monthInt, yearInt }) {
  return (
    <div className="budget_page_container">
      <div className="budget_page_heading">
        <h1 className="budget_page_heading__month_title">{`Budget for ${budgetMonth.month}, ${budgetMonth.year}`}</h1>
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
      </div>
    </div>
  );
}

export default Budget;
