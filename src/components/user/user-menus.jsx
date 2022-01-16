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
    <ul className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-4">
      {userMenuItems.map((item) => (
        <li key={item.name} className="inline-flex flex-col">
          <Link
            to={item.href}
            className="relative flex flex-col items-center justify-center px-2 py-3 text-center transition-colors duration-200 bg-white rounded-lg shadow-lg hover:bg-gray-200"
          >
            <div
              aria-hidden
              className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500"
            >
              {React.createElement(item.icon, {
                className: "h-6 w-6 text-white",
              })}
            </div>
            <a className="mt-3 text-xs font-medium text-gray-900 helper-link-cover">
              {item.name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
