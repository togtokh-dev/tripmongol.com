import React, { useEffect, useState, Fragment } from "react";
import NavigationItem from "./NavigationItem";
import { NAVIGATION_DEMO } from "data/navigation";
import axios from "../../axios";
function Navigation() {
  const [data, setData] = useState(NAVIGATION_DEMO);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const api_menu_1 = await axios.get(`/menu/menu_tours`);
      setData(api_menu_1.data.data);
      setLoading(false);
      console.log(data);
    };
    fetchData();
  }, []);
  return (
    <ul className="nc-Navigation hidden lg:flex lg:flex-wrap lg:items-center lg:space-x-1 relative">
      {loading ? (
        <Fragment></Fragment>
      ) : (
        <Fragment>
          {data.map((item) => (
            <NavigationItem key={item.id} menuItem={item} />
          ))}
        </Fragment>
      )}
    </ul>
  );
}

export default Navigation;
