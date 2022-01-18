import { Link } from "react-router-dom";
import * as React from "react";

function CityInfo(props) {
  const { info } = props;
  return (
    <div className="flex flex-col space-y-1 rounded-md">
      <p className="text-sm font-medium">{info?.name}</p>
      <Link to={`/vaccination/session/${info?.id}`}>
        {" "}
        <button className="btn btn-block btn-info btn-xs">
          Lihat Vaksinasi
        </button>
      </Link>
    </div>
  );
}

export default React.memo(CityInfo);
