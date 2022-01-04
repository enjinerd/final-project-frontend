import React from "react";
import { Link } from "react-router-dom";
import {
  ClipboardListIcon,
  UsersIcon,
  LocationMarkerIcon,
  CogIcon,
} from "@heroicons/react/solid";

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
    href: "/vaccine/nearby",
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
            className="flex flex-col items-center justify-center shadow-lg text-center relative rounded-lg py-3 px-2 bg-white hover:bg-gray-200 transition-colors duration-200"
          >
            <div
              aria-hidden
              className="flex items-center justify-center h-10 w-10 bg-emerald-500 rounded-full"
            >
              {React.createElement(item.icon, {
                className: "h-6 w-6 text-white",
              })}
            </div>
            <a className="text-gray-900 font-medium text-xs mt-3 helper-link-cover">
              {item.name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
