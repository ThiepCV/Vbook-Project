import { Children } from "react";
import React from 'react';

const DefaultLayout = ({children}) =>{
    return(
        <div className="children">
            {children}        </div>
    )
}
export default DefaultLayout