import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useRole from "../hooks/useRole";
import Navbar from "../Pages/Sheared/Navbar";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [role] = useRole(user?.email);

  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li>
              <Link to="/dashboard/myorders">My Orders</Link>
            </li>
            {role && role.role === "Seller" && (
              <>
                <li>
                  <Link to="/dashboard/myorders">Add A Products</Link>
                </li>
                <li>
                  <Link to="/dashboard/myorders">My Products</Link>
                </li>
              </>
            )}
            {role && role.role === "Admin" && (
              <>
                <li>
                  <Link to="/dashboard/allseller">All Seller</Link>
                </li>
                <li>
                  <Link to="/dashboard/myorders">All Buyer</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
