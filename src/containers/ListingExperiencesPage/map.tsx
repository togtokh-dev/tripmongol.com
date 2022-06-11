import React, { FC, useState, useContext, useEffect } from "react";
import AnyReactComponent from "components/AnyReactComponent/AnyReactComponent";
import GoogleMapReact from "google-map-react";
import { DEMO_EXPERIENCES_LISTINGS } from "data/listings";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Checkbox from "shared/Checkbox/Checkbox";
import Pagination from "shared/Pagination/Pagination";
import TabFilters from "./TabFilters";
import Heading2 from "components/Heading/Heading2";
import ExperiencesCardH from "components/ExperiencesCardH/ExperiencesCardH";
import Lang from "../../data/jsons/lang.json";
import AuthContext from "Context/AuthContext";
import axios from "../../axios";
const DEMO_EXPERIENCES = DEMO_EXPERIENCES_LISTINGS.filter((_, i) => i < 12);
console.log(JSON.stringify(DEMO_EXPERIENCES));
export interface SectionGridHasMapProps {
  id: string;
}

const SectionGridHasMap: FC<SectionGridHasMapProps> = ({ id }) => {
  const auth = useContext(AuthContext);
  const [currentHoverID, setCurrentHoverID] = useState<string | number>(-1);
  const [showFullMapFixed, setShowFullMapFixed] = useState(false);
  const [data, setData] = useState(DEMO_EXPERIENCES);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const api_ = await axios.get(`/tour_/categories/${id}`);
      setData(api_.data.data);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="relative flex min-h-screen">
        {/* CARDSSSS */}
        <div className="min-h-screen w-full xl:w-[780px] 2xl:w-[880px] flex-shrink-0 xl:px-8 ">
          <Heading2
            heading={auth.language.tours}
            subHeading={
              <span className="block text-neutral-500 dark:text-neutral-400 mt-3"></span>
            }
          />
          <div className="mb-8 lg:mb-11">
            <TabFilters />
          </div>
          {!loading ? (
            <div className="grid grid-cols-1 gap-8">
              {data.map((item) => (
                <div
                  key={item.id}
                  onMouseEnter={() => setCurrentHoverID((_) => item.id)}
                  onMouseLeave={() => setCurrentHoverID((_) => -1)}
                >
                  <ExperiencesCardH data={item} />
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
          {/* <div className="flex mt-16 justify-center items-center">
            <Pagination />
          </div> */}
        </div>

        <div
          className="flex xl:hidden items-center justify-center fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-neutral-900 text-white shadow-2xl rounded-full z-30  space-x-3 text-sm cursor-pointer"
          onClick={() => setShowFullMapFixed(true)}
        >
          <i className="text-lg las la-map"></i>
          <span>Show map</span>
        </div>

        {/* MAPPPPP */}
        <div
          className={`xl:flex-grow xl:static xl:block ${
            showFullMapFixed ? "fixed inset-0 z-50" : "hidden"
          }`}
        >
          {showFullMapFixed && (
            <ButtonClose
              onClick={() => setShowFullMapFixed(false)}
              className="bg-white absolute z-50 left-3 top-3 shadow-lg rounded-xl w-10 h-10"
            />
          )}

          <div className="fixed xl:sticky top-0 xl:top-[88px] left-0 w-full h-full xl:h-[calc(100vh-88px)] rounded-md overflow-hidden">
            <div className="absolute bottom-5 left-3 lg:bottom-auto lg:top-2.5 lg:left-1/2 transform lg:-translate-x-1/2 py-2 px-4 bg-white shadow-xl z-10 rounded-2xl min-w-max">
              <Checkbox
                className="text-xs xl:text-sm text-neutral-800"
                name="xx"
                label={auth.language.Search_as_I_move_the_map}
              />
            </div>
            {/* BELLOW IS MY GOOGLE API KEY -- PLEASE DELETE AND TYPE YOUR API KEY */}

            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyDxJaU8bLdx7sSJ8fcRdhYS1pLk8Jdvnx0",
              }}
              defaultZoom={12}
              yesIWantToUseGoogleMapApiInternals
              defaultCenter={DEMO_EXPERIENCES[0].map}
            >
              {DEMO_EXPERIENCES.map((item) => (
                <AnyReactComponent
                  isSelected={currentHoverID === item.id}
                  key={item.id}
                  lat={item.map.lat}
                  lng={item.map.lng}
                  experiences={item}
                />
              ))}
            </GoogleMapReact>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionGridHasMap;
