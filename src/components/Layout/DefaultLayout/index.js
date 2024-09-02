
import Navleft from "./LeftNavbar/LeftNavbar";
import NavrightComponent from "./RightNavBar/RightNavbar";
import "../DefaultLayout/style.css"

const DefaultLayout = ({ children }) => {
    return (
        <div className="default-layout">
            <div className="Navright"><NavrightComponent/></div>
            <div className="children">
                {children}
            </div>
            <div className="Navleft"><Navleft/></div>
           

        </div>
    );
};

export default DefaultLayout;
