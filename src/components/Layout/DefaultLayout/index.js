import React from 'react';
import Navleft from "../../../pages/users/theme/NavLeft/navleft"
import NavrightComponent from "../../../pages/users/theme/NavRight/navright"


const DefaultLayout = ({children}) =>{
    return(
        <div className="layout">
           <NavrightComponent/>
            <div className="Content">
                {children}
            </div>
            <Navleft/>
        </div>
    )
}
export default DefaultLayout