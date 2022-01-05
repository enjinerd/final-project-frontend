import {
  ClipboardListIcon,
  CogIcon,
  LocationMarkerIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import React from "react";
import { Link } from "react-router-dom";

const userMenuItems = [
  {
    name: "Info Sesi Vaksinasi",
    href: "/user/vaccine-session",
    icon: ClipboardListIcon,
  },
  {
    name: "Anggota Keluarga",
    href: "/user/family-member",
    icon: UsersIcon,
  },
  {
    name: "Vaksinasi Terdekat",
    href: "/vaccination",
    icon: LocationMarkerIcon,
  },
  {
    name: "Ubah Data Pribadi",
    href: "/user/profile",
    icon: CogIcon,
  },
];

export function UserMenus() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-6">
      {userMenuItems.map((item) => (
        <li key={item.name} className="inline-flex flex-col">
          <Link
            to={item.href}
            className="flex relative flex-col justify-center items-center px-2 py-3 text-center bg-white rounded-lg shadow-lg transition-colors duration-200 hover:bg-gray-200"
          >
            <div
              aria-hidden
              className="flex justify-center items-center w-10 h-10 bg-emerald-500 rounded-full"
            >
              {React.createElement(item.icon, {
                className: "h-6 w-6 text-white",
              })}
            </div>
            <a className="helper-link-cover mt-3 text-xs font-medium text-gray-900">
              {item.name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
