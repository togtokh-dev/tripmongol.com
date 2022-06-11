import React, { FC, useContext } from "react";
import Logo from "shared/Logo/Logo";
import Navigation from "shared/Navigation/Navigation";
import SearchDropdown from "./SearchDropdown";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import MenuBar from "shared/MenuBar/MenuBar";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import Lang from "../../data/jsons/lang.json";
import LangDropdown from "./LangDropdown";
import AuthContext from "Context/AuthContext";
import AvatarDropdown from "./AvatarDropdown";
export interface MainNav1Props {
  isTop: boolean;
}

const MainNav1: FC<MainNav1Props> = ({ isTop }) => {
  const auth = useContext(AuthContext);
  return (
    <div
      className={`nc-MainNav1 relative z-10 ${
        isTop ? "onTop " : "notOnTop backdrop-filter"
      }`}
    >
      <div className="container py-5 relative flex justify-between items-center space-x-4 xl:space-x-8">
        <div className="flex justify-start flex-grow items-center space-x-4 sm:space-x-10 2xl:space-x-14">
          <Logo />
          <Navigation />
        </div>
        <div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
          <div className="hidden items-center xl:flex space-x-1">
            <SwitchDarkMode />
            <LangDropdown />
            <div className="px-1" />

            {auth.logged ? (
              <AvatarDropdown />
            ) : (
              <ButtonPrimary href="/login">
                {" "}
                {auth.language.register}
              </ButtonPrimary>
            )}
          </div>
          <div className="flex items-center xl:hidden">
            <SwitchDarkMode />
            {auth.logged ? <AvatarDropdown /> : ""}
            <div className="px-1" />
            <MenuBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav1;
