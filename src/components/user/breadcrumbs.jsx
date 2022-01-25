import { HomeIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router";

export const Breadcrumbs = ({ path }) => {
  const history = useHistory();
  let pathData = path.split("/");
  pathData.shift();
  pathData.pop();
  pathData.map((item, index) => {
    if (item == "User") {
      return "Profil";
    } else if(item == "Vaccine") {
      return "Vaksinasi";
    }
  })
  return (
    <div className="flex flex-row items-center justify-center px-3 py-3 space-x-2 bg-white rounded-md shadow-lg backdrop-blur-lg backdrop-filter bg-opacity-40">
      <HomeIcon
        className="w-6 h-6 cursor-pointer hover:text-emerald-600"
        onClick={() => history.push("/")}
      />
      {pathData.map((item, index) => (
        <p
          className="flex flex-row space-x-1 font-medium text-gray-600 capitalize cursor-pointer hover:text-emerald-600"
          onClick={() => history.push(`/${item}`)}
        >
          <ChevronRightIcon className="w-6 h-6" /> {item}
        </p>
      ))}
    </div>
  );
};
