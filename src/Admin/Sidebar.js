import React from "react";
import "./sidebar.css";
import logo from "../assets/logo.png"
import { Link } from "react-router-dom";
import { FiChevronDown,  } from 'react-icons/fi';
import { FaPlusSquare, FaRegListAlt } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';
import { TiThLarge,  } from 'react-icons/ti';
import { BsClipboardData } from 'react-icons/bs';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Ecommerce" />
        </Link>
      </div>
      <div className="menu">
        <Link to="/admin" className="menu-item">
          <TiThLarge className="menu-icon" />
          <span className="">Dashboard</span>
        </Link>
        <div className="menu-item has-children">
          <FaRegListAlt className="menu-icon" />
          <span className="menu-text">Products</span>
          <FiChevronDown className="submenu-icon" />
          <ul className="submenu">
            <li>
              <Link to="/admin/products">
                <BsClipboardData className="submenu-icon" />
                <span>All</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/product">
                <FaPlusSquare className="submenu-icon" />
                <span>Create</span>
              </Link>
            </li>
          </ul>
        </div>
        <Link to="/admin/orders" className="menu-item">
          <FaRegListAlt className="menu-icon" />
          <span className="menu-text">Orders</span>
        </Link>
        <Link to="/admin/users" className="menu-item">
          <FaRegUser className="menu-icon" />
          <span className="menu-text">Users</span>
        </Link>
        <Link to="/admin/reviews" className="menu-item">
          <BsClipboardData className="menu-icon" />
          <span className="menu-text">Reviews</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
