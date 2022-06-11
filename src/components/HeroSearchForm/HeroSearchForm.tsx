import React, { FC, useState, useContext } from "react";
import "react-dates/initialize";
import ExperiencesSearchForm from "./ExperiencesSearchForm";
import StaySearchForm from "./StaySearchForm";
import RentalCarSearchForm from "./RentalCarSearchForm";
import FlightSearchForm from "./FlightSearchForm";
import Lang from "../../data/jsons/lang.json";
import AuthContext from "Context/AuthContext";
export type SearchTab = "Stays" | "Experiences" | "Cars" | "Flights";
export interface HeroSearchFormProps {
  className?: string;
  currentTab?: SearchTab;
  currentPage?: "Stays" | "Experiences" | "Cars" | "Flights";
}

const HeroSearchForm: FC<HeroSearchFormProps> = ({
  className = "",
  currentTab = "Stays",
  currentPage,
}) => {
  const auth = useContext(AuthContext);
  const tabs: SearchTab[] = ["Stays", "Experiences", "Cars", "Flights"];
  const [tabActive, setTabActive] = useState<SearchTab>(currentTab);

  const renderTab = () => {
    return (
      <ul className="ml-2 sm:ml-6 md:ml-12 flex space-x-5 sm:space-x-8 lg:space-x-11 overflow-x-auto hiddenScrollbar">
        <li
          className={`flex-shrink-0 flex items-center cursor-pointer text-sm lg:text-base font-medium text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-400 `}
        >
          <span className="block w-2.5 h-2.5 rounded-full bg-neutral-800 dark:bg-neutral-100 mr-2" />
          <span>{auth.language.hero_search_location}</span>
        </li>
        {/* {tabs.map((tab) => {
          const active = tab === tabActive;
          return (
            <li
              onClick={() => setTabActive(tab)}
              className={`flex-shrink-0 flex items-center cursor-pointer text-sm lg:text-base font-medium ${
                active
                  ? ""
                  : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-400"
              } `}
              key={tab}
            >
              {active && (
                <span className="block w-2.5 h-2.5 rounded-full bg-neutral-800 dark:bg-neutral-100 mr-2" />
              )}
              <span>{tab}</span>
            </li>
          );
        })} */}
      </ul>
    );
  };

  const renderForm = () => {
    const isArchivePage = !!currentPage && !!currentTab;
    // switch (tabActive) {
    //   case "Stays":
    //     return <StaySearchForm haveDefaultValue={isArchivePage} />;
    //   case "Experiences":
    //     return <ExperiencesSearchForm haveDefaultValue={isArchivePage} />;
    //   case "Cars":
    //     return <RentalCarSearchForm haveDefaultValue={isArchivePage} />;
    //   case "Flights":
    //     return <FlightSearchForm haveDefaultValue={isArchivePage} />;

    //   default:
    //     return null;
    // }
    return <StaySearchForm haveDefaultValue={isArchivePage} />;
  };

  return (
    <div
      className={`nc-HeroSearchForm w-full max-w-6xl py-5 lg:py-0 ${className}`}
      data-nc-id="HeroSearchForm"
    >
      {renderTab()}
      {renderForm()}
    </div>
  );
};

export default HeroSearchForm;
