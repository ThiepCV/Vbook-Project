import React from 'react';
import { memo} from "react";
import { faMessage} from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const handleButtonClick = (url) => {
    window.location.href = url;
  };
const Navleft = Array.from({ length: 12 }, (_, i) => (
  <div key={i} className="calendar-icon">
    {/* Calendar icon component or image */}
  </div>
));

// Thành phần Navleft
const NavleftComponent = () => (
  <div className="container">
    <div className="calendar-grid">
      {Navleft} {/* Sử dụng biến Navleft ở đây */}
      asada
    </div>
    <div className="search-list">
     <div className='search'><input className='input_search' type="text" placeholder="Search" /></div>
      <ul>
        {/* List items will be dynamically populated */}
        <li>Item 1</li>
        <li>Item 2</li>
        {/* ... */}
      </ul>
    </div>
    <div className='navigation_left'><button onClick={() => handleButtonClick('/heart')}>
    <FontAwesomeIcon icon={faMessage} />
    </button></div>
  </div>
);

export default memo(NavleftComponent);
