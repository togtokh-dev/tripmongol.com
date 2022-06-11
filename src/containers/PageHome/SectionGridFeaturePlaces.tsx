import React, { FC, ReactNode, useEffect, useState, useContext } from "react";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import StayCard from "components/StayCard/StayCard";
import Lang from "../../data/jsons/lang.json";
import axios from "../../axios";
import AuthContext from "Context/AuthContext";
// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);
// console.log("first", DEMO_DATA);
// console.log(JSON.stringify(DEMO_DATA));
//
export interface SectionGridFeaturePlacesProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  stayListings = DEMO_DATA,
  gridClass = "",
  heading = Lang["mon"].special_tour,
  subHeading = Lang["mon"].special_tour_text,
  headingIsCenter,
  tabs = ["Энгийн багц аялал"],
}) => {
  const auth = useContext(AuthContext);
  heading = auth.language.special_tour;
  subHeading = auth.language.special_tour_text;
  const [data, setData] = useState(stayListings);
  const [a_tabs, seta_tabs] = useState(tabs);
  const [selceted, setSelceted] = useState(tabs[0]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const api_menu_1 = await axios.get(`/tour_`);
      const loc_data = await axios.get(`/function/location`);
      seta_tabs(loc_data.data);
      setData(api_menu_1.data.data);
      setLoading(false);
      console.log(data);
    };
    fetchData();
  }, []);
  const renderCard = (stay: StayDataType) => {
    return <StayCard key={stay.id} data={stay} />;
  };

  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      <HeaderFilter
        tabActive={"Энгийн багц аялал"}
        subHeading={subHeading}
        tabs={a_tabs}
        heading={heading}
        onClickTab={(e) => {
          setSelceted(e);
        }}
      />
      {loading ? "Loading..." : ""}
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {data
          .filter((name) => name.listingCategory.name.includes(selceted))
          .map((stay) => renderCard(stay))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary loading>{auth.language.Show_me_more}</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFeaturePlaces;
