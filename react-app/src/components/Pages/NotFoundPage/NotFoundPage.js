import React from 'react';
import { Link } from 'react-router-dom';
import "./NotFoundPage.css"


function NotFoundPage () {
        return (
        <div className="not_found_page_container">
            <div className="not_found_image">
                <p style={{ textAlign: "center" }}>
                    Sorry, page was not found, click here to go:
                    <Link to="/"> Home </Link>
                </p>
            </div>
        </div>
        )
}
export default NotFoundPage;