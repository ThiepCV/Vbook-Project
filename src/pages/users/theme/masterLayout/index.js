import React from 'react';
import { memo } from "react";
import Navright from '../NavRight';
import Navleft from '../NavLeft';

const MasterLayout = ({children, ...props }) =>{
    return (
    <div className= "layout"  {...props}> 
    <div className='Navright'><Navright/></div> 
    <div className='children'>{children}</div>
    <div className='Navleft'><Navleft/></div> 
    </div>)
}
export default memo(MasterLayout);