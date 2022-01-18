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
                state: {
                  columns: [
                    { title: "Name", field: "name" },
                    { title: "Stock", field: "stock", type: "numeric" },
                  ],
                  data: [
                    { name: "Sinovac", stock: 600 },
                    { name: "Moderna", stock: 600 },
                  ],
                },
              }}
            >
              Vaccines
            </Link>
          </li>
          <li>
            <Link
              to={{
                pathname: "/admin/session",
                state: {
                  columns: [
                    { title: "Start Date", field: "startDate" },
                    { title: "End Date", field: "endDate" },
                    { title: "Vaccine", field: "vaccine" },
                    { title: "Quota", field: "quota", type: "numeric" },
                    {
                      title: "Session Type",
                      field: "sessionType",
                      type: "numeric",
                    },
                  ],
                  data: [
                    {
                      startDate: "10 Desember 2021",
                      endDate: "10 Desember 2021",
                      vaccine: "Sinovac",
                      quota: 700,
                      sessionType: 1,
                    },
                    {
                      startDate: "15 Desember 2021",
                      endDate: "15 Desember 2021",
                      vaccine: "Moderna",
                      quota: 600,
                      sessionType: 1,
                    },
                    {
                      startDate: "27 Desember Desember",
                      endDate: "27 Desember Desember",
                      vaccine: "Astra",
                      quota: 500,
                      sessionType: 2,
                    },
                    {
                      startDate: "27 Januari 2022",
                      endDate: "27 Januari 2022",
                      vaccine: "Moderna",
                      quota: 600,
                      sessionType: 2,
                    },
                  ],
                },
              }}
            >
              Vaccination Sessions
            </Link>
          </li>
          <li>
            <Link
              to={{
                pathname: "/admin/user",
                state: {
                  columns: [
                    { title: "Name", field: "name" },
                    { title: "DOB", field: "dob" },
                    { title: "Address", field: "address" },
                    { title: "Phone Number", field: "phoneNumber" },
                    { title: "Status", field: "status", type: "numeric" },
                  ],
                  data: [
                    {
                      name: "Mark Lee",
                      dob: "18 Maret 1999",
                      address: "Vancouver",
                      phoneNumber: "085723252648",
                      status: 0,
                    },
                    {
                      name: "Jeong Jaehyun",
                      dob: "14 Februari 1997",
                      address: "Seoul",
                      phoneNumber: "085723252648",
                      status: 1,
                    },
                    {
                      name: "Jay Park",
                      dob: "18 Maret 2002",
                      address: "LA",
                      phoneNumber: "085723252648",
                      status: 2,
                    },
                    {
                      name: "Jake Shim",
                      dob: "8 Agustus 2002",
                      address: "Busan",
                      phoneNumber: "085723252648",
                      status: 2,
                    },
                    {
                      name: "Mark Lee",
                      dob: "18 Maret 1999",
                      address: "Vancouver",
                      phoneNumber: "085723252648",
                      status: 0,
                    },
                    {
                      name: "Jeong Jaehyun",
                      dob: "14 Februari 1997",
                      address: "Seoul",
                      phoneNumber: "085723252648",
                      status: 1,
                    },
                    {
                      name: "Jay Park",
                      dob: "18 Maret 2002",
                      address: "LA",
                      phoneNumber: "085723252648",
                      status: 2,
                    },
                    {
                      name: "Jake Shim",
                      dob: "8 Agustus 2002",
                      address: "Busan",
                      phoneNumber: "085723252648",
                      status: 2,
                    },
                    {
                      name: "Mark Lee",
                      dob: "18 Maret 1999",
                      address: "Vancouver",
                      phoneNumber: "085723252648",
                      status: 0,
                    },
                    {
                      name: "Jeong Jaehyun",
                      dob: "14 Februari 1997",
                      address: "Seoul",
                      phoneNumber: "085723252648",
                      status: 1,
                    },
                    {
                      name: "Jay Park",
                      dob: "18 Maret 2002",
                      address: "LA",
                      phoneNumber: "085723252648",
                      status: 2,
                    },
                    {
                      name: "Jake Shim",
                      dob: "8 Agustus 2002",
                      address: "Busan",
                      phoneNumber: "085723252648",
                      status: 2,
                    },
                    {
                      name: "Mark Lee",
                      dob: "18 Maret 1999",
                      address: "Vancouver",
                      phoneNumber: "085723252648",
                      status: 0,
                    },
                    {
                      name: "Jeong Jaehyun",
                      dob: "14 Februari 1997",
                      address: "Seoul",
                      phoneNumber: "085723252648",
                      status: 1,
                    },
                    {
                      name: "Jay Park",
                      dob: "18 Maret 2002",
                      address: "LA",
                      phoneNumber: "085723252648",
                      status: 2,
                    },
                    {
                      name: "Jake Shim",
                      dob: "8 Agustus 2002",
                      address: "Busan",
                      phoneNumber: "085723252648",
                      status: 2,
                    },
                  ],
                },
              }}
            >
              Users
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
