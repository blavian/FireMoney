import React from "react"
import BudgetItem from "./BudgetItem"
import { useDispatch, useSelector } from "react-redux"


function BudgetGroup() {
    const dispatch = useDispatch();
    return (
        <div className="budget_group_container">
            <div className="budget_group_heading_container">
                <div className="budget_group_heading budget_group_title">
                    <h2>Budget Group</h2>
                </div>
                <div className="budget_group_heading budget_group_amount">
                    <h3>Amount Budgeted</h3>
                </div>
                <div className="budget_group_heading budget_group_spent">
                    <h3>Total Spent</h3>
                </div>
            </div>
            <BudgetItem />
        </div>
    )
}

export default BudgetGroup;