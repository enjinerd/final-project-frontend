import React from "react";
import { useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  ViewListIcon,
  InformationCircleIcon,
} from "@heroicons/react/solid";
import clsx from "clsx";

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
    icon: UserIcon,
  },
  {
    name: "Vaksinasi",
    href: "/vaksinasi",
    icon: ViewListIcon,
  },
  {
    name: "Tentang",
    href: "/tentang",
    icon: InformationCircleIcon,
  },
];

const navigationClasses = (isActive) => {
  return [
    "inline-flex flex-col items-center justify-center text-center h-12 px-2 rounded-md",
    isActive ? "text-green-500 font-semibold" : "text-gray-600",
    "hover:text-green-500",
  ];
};

export function BottomNav() {
  const router = useRouteMatch();

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
    <nav className="fixed bottom-0 z-40 flex items-center justify-center w-full h-16 px-2 bg-white border-t border-gray-300">
      <div className="flex items-center justify-center w-full max-w-xl mx-auto">
        <ul className="flex items-center w-full justify-evenly">
          {navItems.map((item) => {
            const isActive = item.exact
              ? item.href === router.path
              : router.path.startsWith(item.href);

            return (
              <li key={item.name} className="relative">
                <Link to={item.href}>
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
