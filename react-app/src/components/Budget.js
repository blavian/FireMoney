import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import BudgetGroup from "./BudgetGroup";
import { Modal } from "../context/Modal"
import TransactionForm from "../components/TransactionForm"

import * as budgetActions from "../store/reducers/budget";
import * as sessionActions from "../store/reducers/session"
import { getTransactionModal, hideTransactionModal } from "../store/reducers/modal"

function Budget({ monthInt, yearInt }) {

  // Local state
  const [newGroupName, setNewGroupName] = useState("");
  const [noNextMonth, setNoNextMonth] = useState(false)
  const [noPreviousMonth, setNoPreviousMonth] = useState(false)
  const transactionModal = useSelector((x) => x.transactionModal.transactionModalShow)
  const userMonths = useSelector((x)=> x.session.user.months)
  // console.log("useonths",userMonths)
  // Hooks
  const dispatch = useDispatch();
  const budgetMonth = useSelector((x) => x.budget.budgetMonth);
  const currentYear = budgetMonth.yearInt
  const currentMonth = budgetMonth.monthInt
  const history = useHistory();

  // Run ONLY on first render--gets requested budget month

  useEffect(()=>{
    if (monthInt & yearInt){
      dispatch(budgetActions.getBudgetMonth({ monthInt, yearInt }));
      dispatch(sessionActions.getUserMonths())
    }
  },[history])


  useEffect(() => {
    // 1) find current date
    dispatch(sessionActions.getUserMonths())
    var today = new Date();
    var monthToday = Number(today.getMonth() + 1)
    var yearToday = Number(today.getFullYear());
    // let currentMonth = false
    // 2) find current month or else newest month
    // if (userMonths){
    //   for (let key in userMonths) {
    //     let month = userMonths[key]
    //     // if we have a month for today, go to that month
    //     if ((Number(month.yearInt) == Number(yearToday)) && (Number(month.monthInt) == Number(monthToday))) {
    //       currentMonth = true
    //     }
    //   }
    //   if (currentMonth == false){
    //     dispatch(budgetActions.createCurrentBudgetMonth())
    //     // history.push(`/budget?monthInt=${monthToday}&yearInt=${yearToday}`)
    //     // dispatch(budgetActions.getBudgetMonth({ monthInt: monthToday, yearInt: yearToday }))
    //   }
      history.push(`/budget?monthInt=${monthToday}&yearInt=${yearToday}`)
      dispatch(budgetActions.getBudgetMonth({ monthInt: monthToday, yearInt: yearToday }))
    // }
    return
  },[]);

  const nextBudgetMonth = () => {
    setNoPreviousMonth(()=>false)
    dispatch(sessionActions.getUserMonths())
    let nextMonth;
    let nextYear;
    if (currentMonth == 12){
      nextMonth = 1
      nextYear = currentYear*1 + 1
    } else {
      nextMonth = currentMonth*1 + 1
      nextYear = currentYear
    }
    for (let key in userMonths){
      let month = userMonths[key]
      if ((Number(month.yearInt) == Number(nextYear)) && (Number(month.monthInt) == Number(nextMonth))){
        setNoNextMonth(()=>false)
        history.push(`/budget?monthInt=${nextMonth}&yearInt=${nextYear}`)
        dispatch(budgetActions.getBudgetMonth({ monthInt: nextMonth, yearInt: nextYear }))
        return
      }
    }
    setNoNextMonth(true)
    setTimeout(()=>{
      setNoNextMonth(false)
    }, 3000)
  }


  const previousBudgetMonth = () => {
    setNoNextMonth(()=>false)
    dispatch(sessionActions.getUserMonths())
    let previousMonth;
    let previousYear;
    if (currentMonth == 1){
      previousMonth = 12
      previousYear = currentYear*1 - 1
    } else {
      previousMonth = currentMonth*1 - 1
      previousYear = currentYear
    }
    for (let key in userMonths){
      let month = userMonths[key]
      if ((Number(month.yearInt) == Number(previousYear)) && (Number(month.monthInt) == Number(previousMonth))){
        setNoPreviousMonth(()=>false)
        history.push(`/budget?monthInt=${previousMonth}&yearInt=${previousYear}`)
        dispatch(budgetActions.getBudgetMonth({ monthInt: previousMonth, yearInt: previousYear }))
        return
      }
    }
    setNoPreviousMonth(true)
    setTimeout(() => {
      setNoPreviousMonth(false)
    }, 3000)
  }


  // Budget month create action
  const createNextBudgetMonth = (evt, copyPrevious) => {
    setNoNextMonth(()=>false)
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
    ).then(()=>{
      dispatch(sessionActions.getUserMonths())
      dispatch(budgetActions.getBudgetMonth({ monthInt: nextMonth, yearInt: nextYear }))

    })

    history.push(`/budget?monthInt=${nextMonth}&yearInt=${nextYear}`);

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
      {budgetMonth.month &&
      <>
      <div>
      <h1 className="budget_page_heading__month_title">{`Budget for ${budgetMonth.month}, ${budgetMonth.yearInt}`}</h1>
        <button type="button" onClick={previousBudgetMonth}>previous month</button>
        <button type="button" onClick={nextBudgetMonth}>next month</button>
        {noPreviousMonth && <p>you don't have a previous months budget created</p>}
        {noNextMonth && <p>you don't have next months budget created</p>}
      </div>

      <button type="button" onClick={(evt) => createNextBudgetMonth(evt, true)}>Create a new budget month</button>
  {
    budgetMonth.groups
    ? Object.keys(budgetMonth.groups).map((key) => (
      <BudgetGroup
        groupId={budgetMonth.groups[key].id}
        key={`budget-group-${budgetMonth.groups[key].id}`}
      />
    ))
    : ""
  }
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
  {
    transactionModal && (
      <Modal onClose={() => dispatch(hideTransactionModal())} >
        <TransactionForm />
      </Modal>
    )
  }
  </>
}
    </div >

  );

}

export default Budget;
