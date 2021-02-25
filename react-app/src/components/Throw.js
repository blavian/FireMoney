import React from "react"
import BudgetGroup from "./BudgetGroup"

function Throw() {
    return (
        <div className="budget_group_month_container">
            <div className="budget_item_title">
                <h1>Budget Month</h1>
            </div>
            <BudgetGroup />
        </div>
    )
}

export default Throw;