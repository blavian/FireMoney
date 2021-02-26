import React from "react";
import BudgetItem from "./BudgetItem";
import { useDispatch, useSelector } from "react-redux";

// import * as budgetActions from "../store/reducers/budget";

function BudgetGroup({ id }) {
    const budgetGroup = useSelector((x) => x.budget.budgetMonth.groups[id]);
    const dispatch = useDispatch();

    const getItemsExpectedAmountTotal = () => {
        let total = 0;
        for (const key in budgetGroup.items) {
            total += parseFloat(budgetGroup.items[key].expectedAmount);
        }
        return total;
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
            <BudgetItem />
            <div className="add_budget_item_container">
                <button className="add_budget_item_button">ADD ITEM</button>
            </div>
        </div>
    );
}

export default BudgetGroup;
