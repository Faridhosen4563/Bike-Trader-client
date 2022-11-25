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
          <ul className="menu p-4 w-80  text-base-content">
            {role && role.role === "Buyer" && (
              <li>
                <Link to="/dashboard/myorders" className="btn btn-info mb-2">
                  My Orders
                </Link>
              </li>
            )}
            {role && role.role === "Seller" && (
              <>
                <li>
                  <Link
                    to="/dashboard/addproduct"
                    className="btn btn-info mb-2"
                  >
                    Add A Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/myporducts"
                    className="btn btn-info mb-2"
                  >
                    My Products
                  </Link>
                </li>
              </>
            )}
            {role && role.role === "Admin" && (
              <>
                <li>
                  <Link to="/dashboard/allseller" className="btn btn-info mb-2">
                    All Seller
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/allbuyer" className="btn btn-info mb-2">
                    All Buyer
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/reported" className="btn btn-info mb-2">
                    Reported Items
                  </Link>
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
