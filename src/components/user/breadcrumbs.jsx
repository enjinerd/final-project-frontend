import { HomeIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router";

export const Breadcrumbs = ({ path }) => {
  const history = useHistory();
  let pathData = path.split("/");
  pathData.shift();
  pathData.pop();
  let data = pathData?.map((item) => {
    if (item == "user") {
      return "profil";
    } else if (item == "vaccination") {
      return "vaksinasi";
    }
    return item;
  });

  return (
    <div className="flex flex-row justify-center items-center px-3 py-3 space-x-2 bg-white bg-opacity-40 rounded-md shadow-lg backdrop-filter backdrop-blur-lg">
      <HomeIcon
        className="w-6 h-6 cursor-pointer hover:text-emerald-600"
        onClick={() => history.push("/")}
      />
      {pathData.map((item, index) => (
        <p
          className="flex flex-row space-x-1 font-medium text-gray-600 capitalize cursor-pointer hover:text-emerald-600"
          onClick={() => history.push(`/${item}`)}
        >
          <ChevronRightIcon className="w-6 h-6" /> {data[index]}
        </p>
      ))}
    </div>
  );
};
