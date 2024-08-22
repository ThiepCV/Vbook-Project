import React from 'react';
import { memo} from "react";
import { faHouse, faSearch, faHeart, faUser, faBars } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// const Navright = () =>{
//     return (
//     <div className='layout-right'> 
//     <h1>Navright</h1>
//     </div>)
// }


const handleButtonClick = (url) => {
  window.location.href = url;
};

const Navright = () => (
  <>
    <div className='nav_logo'><img src="https://vnext.vn/img/logo.svg" alt="VNEXT Logo" className="vnext-logo" /></div>
    <div className="notepad">
    </div>
    <div className="navigation">
    <ul id='main-menu'>
    <li>
          <button onClick={() => handleButtonClick('/home')}>
            <FontAwesomeIcon icon={faHouse}/>
          </button>
        </li>
        <li>
          <button onClick={() => handleButtonClick('/search')}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </li>
        <li>
          <button onClick={() => handleButtonClick('/heart')}>
            <FontAwesomeIcon icon={faHeart}/>
          </button>
        </li>
        <li>
          <button onClick={() => handleButtonClick('/user')}>
            <FontAwesomeIcon icon={faUser}/>
          </button>
        </li>
        <li>
          <button onClick={() => handleButtonClick('/menu')}>
            <FontAwesomeIcon icon={faBars}/>
          </button>
          <ul className="sub-menu">
            <li>DISPLAY</li>
            <li>SETTING</li>
            <li>REPORT AN ISSUE</li>
            <li>LOGIN/LOGOUT</li>
        </ul>
        </li>
      </ul>
    </div>
  </>
);

export default memo(Navright);
