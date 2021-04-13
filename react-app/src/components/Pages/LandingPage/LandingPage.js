import React from "react";
import list_icon from "../../../images/List.png"
import savings_icon from "../../../images/Savings.png"
import control_icon from "../../../images/control.png"
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as budgetActions from "../../../store/reducers/budget";
import * as sessionActions from "../../../store/reducers/session"
import "./LandingPage.css"
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

function LandingPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const goToBudget = (e) => {
        e.preventDefault();
        // when budget is clicked on dropdown, user is sent to current month
        dispatch(sessionActions.getUserMonths())
        var today = new Date();
        var monthToday = Number(today.getMonth() + 1)
        var yearToday = Number(today.getFullYear());
        dispatch(budgetActions.getBudgetMonth({ monthInt: monthToday, yearInt: yearToday }))
        history.push(`/budget?monthInt=${monthToday}&yearInt=${yearToday}`)
    }
    return (
        <div className="landing_page_container" >
            <div className="landing_page_image">
                <p className="landing_page_text">Get Started On The Road To Financial Freedom</p>
                <button className="build_budget_button" onClick={(e) => goToBudget(e)}>
                    Build your budget
                </button>
            </div>
            <div className="landing_page_secondary_content">
                <h2 className="tiles_heading_text">Benefits of Budgeting</h2>
                <div className="tiles_container">
                    <div className="landing_page_tile" >
                        <p className="tiles_text" >Plan for your Future!</p>
                        <img className="landing_page_tile_images" src={list_icon} alt="Plan" />
                    </div>
                    <div className="landing_page_tile" >
                        <p className="tiles_text" >Save for unexpected expenses!</p>
                        <img className="landing_page_tile_images" src={savings_icon} alt="Savings" />
                    </div>
                    <div className="landing_page_tile " >
                        <p className="tiles_text control_tile_text" >Take control of your money!</p>
                        <img className="landing_page_tile_images" src={control_icon} alt="Control" />
                    </div>
                </div>
                <div className="budget_button_container">
                    <button className="build_budget_button lower_button" onClick={(e) => goToBudget(e)}>
                        Build your budget
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;
