import "./styles.css";
import {
  CollectionIcon,
  HomeIcon,
  InformationCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import clsx from "clsx";
import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const navItems = [
  {
    name: "Beranda",
    href: "/",
    icon: HomeIcon,
    exact: true,
  },
  {
    name: "Profil",
    href: "/user",
    icon: UserCircleIcon,
  },
  {
    name: "Vaksinasi",
    href: "/vaccination",
    icon: CollectionIcon,
  },
  {
    name: "Tentang",
    href: "/tentang",
    icon: InformationCircleIcon,
  },
];

const navigationClasses = (isActive) => {
  return [
    "bottom-nav__item",
    isActive ? "text-emerald-500 font-semibold" : "text-gray-600",
    "hover:text-emerald-500",
  ];
};

export function BottomNav() {
  const router = useLocation();

  const renderItem = (item) => {
    return (
      <>
        {React.createElement(item.icon, {
          className: "w-8 h-8",
          "aria-hidden": true,
        })}
        <span className="text-xs truncate">{item.name}</span>
      </>
    );
  };

  return (
    <nav className="backdrop-blur-lg backdrop-filter bg-opacity-40 bottom-nav">
      <div className="bottom-nav_container">
        <ul className="flex items-center w-full justify-evenly">
          {navItems.map((item) => {
            const isActive = item.exact
              ? item.href === router.pathname
              : router.pathname.startsWith(item.href);

            return (
              <li key={item.name} className="relative">
                <Link
                  to={item.href}
                  onClick={() => console.log(location.pathname)}
                >
                  <a className={clsx(...navigationClasses(isActive))}>
                    {renderItem(item)}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
