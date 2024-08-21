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
    <ul>
    <li>
          <button onClick={() => handleButtonClick('/home')}>
            <FontAwesomeIcon icon={faHouse} style={{ color: "#f5a01a", }} />
          </button>
        </li>
        <li>
          <button onClick={() => handleButtonClick('/search')}>
            <FontAwesomeIcon icon={faSearch} style={{ color: "#f5a01a" }} />
          </button>
        </li>
        <li>
          <button onClick={() => handleButtonClick('/heart')}>
            <FontAwesomeIcon icon={faHeart} style={{ color: "#f5a01a" }} />
          </button>
        </li>
        <li>
          <button onClick={() => handleButtonClick('/user')}>
            <FontAwesomeIcon icon={faUser} style={{ color: "#f5a01a" }} />
          </button>
        </li>
        <li>
          <button onClick={() => handleButtonClick('/menu')}>
            <FontAwesomeIcon icon={faBars} style={{ color: "#f5a01a" }} />
          </button>
        </li>
      </ul>
    </div>
  </>
);

export default memo(Navright);
