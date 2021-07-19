import React from 'react';
import { NavLink } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
const handleSelect=(e)=>{
  localStorage.clear();
  window.location.reload()
}
const Header = () => (
  <div className="header">
    <div className="container">
      <ul className="menu">
        <li>
          <NavLink to="/" exact>VIN Decode</NavLink>
        </li>
        <li>
          <NavLink to="/VinRequest">VIN requests</NavLink>
        </li>
      </ul>
      <ul className="menu1">
        <li>
         
        </li>
       { localStorage.getItem("x-auth-token") && <DropdownButton
      alignRight
      title={"Welcome, "+localStorage.getItem('x-auth-username')}
      id="dropdown-menu-align-right"
      onSelect={handleSelect}
        >
              <Dropdown.Item eventKey="option-1">Logout</Dropdown.Item>
      </DropdownButton>}
      </ul>
    </div>
    

  </div>
)

export default Header;