import React, { FC, useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionGridHasMap from "./map";
import { Helmet } from "react-helmet";
import Lang from "../../data/jsons/lang.json";
import AuthContext from "Context/AuthContext";
import axios from "../../axios";
export interface ListingExperiencesMapPageProps {
  className?: string;
}
type QuizParams = {
  id: string;
};
type apires = {
  id: Number;
  name: string;
  href: string;
  name_en: string;
  thumbnail: string;
  count: Number;
  taxonomy: string;
};
const ListingExperiencesMapPage: FC<ListingExperiencesMapPageProps> = ({
  className = "",
}) => {
  const { id } = useParams<QuizParams>();
  const [data, setData] = useState<apires>({
    id: 1,
    href: "listing-experiences-map",
    name: "Loading",
    name_en: "Loading",
    thumbnail: "/static/media/hero-right2.48e4cfddb1d4706b7139.png",
    count: 0,
    taxonomy: "category",
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const api = await axios.get(`/categories/${id}`);
      setData(api.data.data);
      setLoading(false);
    };
    fetchData();
  }, []);
  const auth = useContext(AuthContext);
  return (
    <div
      className={`nc-ListingExperiencesMapPage relative ${className}`}
      data-nc-id="ListingExperiencesMapPage"
    >
      <Helmet>
        <title>{data.name}</title>
      </Helmet>
      <BgGlassmorphism />

      {/* SECTION HERO */}
      <div className="container pt-10 pb-24 lg:pt-16 lg:pb-32">
        <SectionHeroArchivePage
          currentPage="Experiences"
          currentTab="Experiences"
          list_data={data}
          listingType={
            <>
              <i className="text-2xl las la-umbrella-beach"></i>
              <span className="ml-2.5">
                {data.count} {auth.language.properties}
              </span>
            </>
          }
        />
      </div>

      {/* SECTION */}
      <div className="container pb-24 lg:pb-32 2xl:pl-10 xl:pr-0 xl:max-w-none">
        <SectionGridHasMap id={id} />
      </div>

      <div className="container overflow-hidden">
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Explore by types of stays"
            subHeading="Explore houses based on 10 types of stays"
            categoryCardType="card5"
            itemPerRow={5}
            sliderStyle="style2"
            uniqueClassName="ListingExperiencesMapPage"
          />
        </div> */}

        {/* SECTION */}
        <SectionSubscribe2 className="py-24 lg:py-32" />

        {/* SECTION */}
        <div className="relative py-16 mb-24 lg:mb-32">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox />
        </div>
      </div>
    </div>
  );
};

export default ListingExperiencesMapPage;
