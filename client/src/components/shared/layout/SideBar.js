import React from "react";
import { useLocation, Link } from "react-router-dom";
import { clientMenu } from "./menus/clientMenu";
import "../../../styles/Layout.css";

const SideBar = () => {
  const location = useLocation();
  return (
    <>
      <div className="sidebar">
        <div className="menu">
          {clientMenu.map((menu) => {
            const isActive = location.pathname === menu.path;
            return (
              <div
                key={menu.id}
                className={`menu-item ${isActive && "active"}`}
              >
                <Link to={menu.path}>{menu.name}</Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SideBar;
