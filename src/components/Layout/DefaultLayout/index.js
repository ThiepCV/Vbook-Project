import React from 'react';
import Navleft from "./LeftNavbar/LeftNavbar";
import NavrightComponent from "./RightNavBar/RightNavbar";

const DefaultLayout = ({ children }) => {
    return (
        <div className="default-layout">
            <Navleft />
            <div className="content">
                {children}
            </div>
            <NavrightComponent />
        </div>
    );
};

export default DefaultLayout;
