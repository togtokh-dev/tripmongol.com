import CardAuthorBox from "components/CardAuthorBox/CardAuthorBox";
import CardAuthorBox2 from "components/CardAuthorBox2/CardAuthorBox2";
import Heading from "components/Heading/Heading";
import { DEMO_AUTHORS } from "data/authors";
import { AuthorType } from "data/types";
import React, { FC, useEffect, useState, useContext } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Lang from "../../data/jsons/lang.json";
import axios from "../../axios";
import AuthContext from "Context/AuthContext";
export interface SectionGridAuthorBoxProps {
  className?: string;
  authors?: AuthorType[];
  boxCard?: "box1" | "box2";
}

const DEMO_DATA = DEMO_AUTHORS.filter((_, i) => i < 10);
console.log("firsts", DEMO_DATA);
console.log(JSON.stringify(DEMO_DATA));
const SectionGridAuthorBox: FC<SectionGridAuthorBoxProps> = ({
  className = "",
  authors = DEMO_DATA,
  boxCard = "box1",
}) => {
  const auth = useContext(AuthContext);
  const [data, setData] = useState(authors);
  useEffect(() => {
    const fetchData = async () => {
      const api_menu_1 = await axios.get(`/author`);
      setData(api_menu_1.data.data);
    };
    fetchData();
  }, []);
  return (
    <div
      className={`nc-SectionGridAuthorBox relative ${className}`}
      data-nc-id="SectionGridAuthorBox"
    >
      <Heading desc={auth.language.author_desc} isCenter>
        {auth.language.author_title}
      </Heading>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8 ">
        {data.map((author, index) =>
          boxCard === "box2" ? (
            <CardAuthorBox2 key={author.id} author={author} />
          ) : (
            <CardAuthorBox
              index={index < 3 ? index + 1 : undefined}
              key={author.id}
              author={author}
            />
          )
        )}
      </div>
      <div className="mt-16 flex items-center justify-center space-x-5">
        <ButtonSecondary>{auth.language.Show_me_more} </ButtonSecondary>
        <ButtonPrimary>{auth.language.Become_a_host}</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridAuthorBox;
