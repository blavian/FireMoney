import React from 'react';
import { useSelector } from "react-redux";

function Profile(){
    const currUser = useSelector((x) => x.session.user.username)
    return(
        <>
        <div className="profile_container">
            <h1>Welcome {currUser}</h1>
        </div>
        <div className="profile_months_container">
            <div className="profile_months_heading">
                <h1>Your Budget Months</h1>
            </div>
            <div className="profile_months_card_container">
                <div className="profile_month_card">
                    <h2>January</h2>
                    <h2>Graph</h2>
                    <div className="card_percentages">
                        <ul>
                            <li>
                                <p>Home</p>
                                <p>20%</p>

                            </li>
                            <li>
                                    <p>Auto Bills</p>
                                    <p>20%</p>
                            </li>
                            <li>
                                    <p>Entertainment</p>
                                    <p>20%</p>
                            </li>
                            <li>
                                    <p>Dog Supplies</p>
                                    <p>20%</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="profile_month_card">
                    <h2>January</h2>
                </div>
                <div className="profile_month_card">
                    <h2>January</h2>
                </div>
                <div className="profile_month_card">
                    <h2>January</h2>
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile;