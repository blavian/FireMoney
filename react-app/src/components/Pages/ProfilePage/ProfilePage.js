import React from 'react';
import { useSelector } from "react-redux";
import circleGraph from "../../../images/Circle_Graph.png"
import PieGraph from '../../PieGraph/PieGraph';
import "./ProfilePage.css"

function ProfilePage() {
    const currUser = useSelector((x) => x.session.user.username)
    const userMonths = useSelector((x) => x.session.user.months)

    const total = (month) => {
        const groups = month[0].groups;
        let total = 0;
        for (let group in groups) {
            if (groups[group].itemsTotal > 0) total += groups[group].itemsTotal;
        }
        return parseFloat( total).toFixed(2)
    }

    const calendar = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
    }

    return (
        <div className="profile_page_container">
            <div className="page_heading">
                <h1>Welcome {currUser}</h1>
            </div>
            <div className="profile_months_container">
                <div className="profile_months_heading">
                    <h1>Your Budget Months</h1>
                </div>
                <div className="profile_months_card_container">
                    {
                        userMonths &&
                        (Object.keys(userMonths).map(month =>
                            <div className="profile_month_card" key={userMonths[month].monthInt}>
                                <h2>{calendar[userMonths[month].monthInt]}</h2>
                                <h2>{`$${total([userMonths[month]])}`}</h2>
                                <PieGraph month={userMonths[month]} />
                                {/* <img src={circleGraph} alt="graph"></img> */}
                                {/* <div className="card_percentages">
                                    <ul>
                                        <li className="home_details">
                                            <p>30%</p>
                                            <p>Home</p>

                                        </li>
                                        <li className="auto_bills_details">
                                            <p>30%</p>
                                            <p>Auto Bills</p>
                                        </li>
                                        <li className="entertainment_details">
                                            <p>30%</p>
                                            <p>Entertainment</p>
                                        </li>
                                        <li className="dog_supplies_details">
                                            <p>10%</p>
                                            <p>Dog Supplies</p>
                                        </li>
                                    </ul>
                                </div> */}
                            </div>
                        )

                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;