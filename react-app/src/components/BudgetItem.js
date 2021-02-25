import React from "react"

function BudgetItem(){
    return (
        <div className="budget_group_items_container">
            <div className="budget_item_title">
                <span>Rent</span>
            </div>
            <div className="budget_item_description">
                <span>Due at the first of the month</span>
            </div>
            <div className="budget_item_amount_budgeted">
                <span>$1040.00</span>
            </div>
            <div className="budget_item_amount_spent">
                <span>$00.00</span>
            </div>
        </div>
    )
}

export default BudgetItem;