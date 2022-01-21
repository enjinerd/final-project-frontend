import "./styles.css";
import { Link } from "react-router-dom";
import useAuthAdminStore from "stores/useAuthAdminStore";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SideMenu() {
  const api = import.meta.env.VITE_API_HOST;
  const { isAuthenticated, token } = useAuthAdminStore();
  const decoded = jwt_decode(token);

  return (
    <div className="side-menu">
      <div className="profile flex flex-col justify-center items-center">
        {isAuthenticated ? (
          <>
            <Link
              to={{
                pathname: "/admin",
              }}
            >
              <p className="username">{decoded.name}</p>
            </Link>
          </>
        ) : (
          <Link to={{ pathname: "/admin/logins" }}>Login</Link>
        )}
      </div>
      <div className="artboard menus">
        <ul className="menu p-4">
          <li>
            <Link
              to={{
                pathname: "/admin/vaccine",
              }}
            >
              Vaccines
            </Link>
          </li>
          <li>
            <Link
              to={{
                pathname: "/admin/session",
              }}
            >
              Vaccination Sessions
            </Link>
          </li>
          <li>
            <Link
              to={{
                pathname: "/admin/user",
              }}
            >
              Citizens
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
