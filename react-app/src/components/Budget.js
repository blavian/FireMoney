import React from "react";
import { Link } from "react-router-dom";
import BudgetGroup from "./BudgetGroup"

function Budget({ monthInt, yearInt }) {
  return (
    <div className="budget_page_container">
      <div className="budget_page_heading">
        <h1 className="budget_page_heading__month_title">MONTH TITLE</h1>
        <Link to=""></Link>
      </div>
      <BudgetGroup />
    </div>
  );
}

export default Budget;
