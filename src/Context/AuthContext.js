import React, { createContext, useState } from "react";
import Lang from "../data/jsons/lang.json";
const AuthContext = createContext();
function getCookie(c_name) {
  var i,
    x,
    y,
    ARRcookies = document.cookie.split(";");
  for (i = 0; i < ARRcookies.length; i++) {
    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
    x = x.replace(/^\s+|\s+$/g, "");
    if (x == c_name) {
      return unescape(y);
    }
  }
}
function setCookie(c_name, value, exdays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value =
    escape(value) + (exdays == null ? "" : "; expires=" + exdate.toUTCString());
  document.cookie = c_name + "=" + c_value;
}

export const AuthContextProvider = (props) => {
  let lan_data = "mon";
  if (getCookie("language")) {
    lan_data = getCookie("language");
  }
  const [logged, setLogged] = useState(false);
  const [token, setToken] = useState("");
  const [lang, setLang] = useState(lan_data);
  const [language, setLanguage] = useState(Lang[lan_data]);
  const [user, setUser] = useState([]);

  const HandleLogin = () => {
    setLogged(!logged);
  };

  const HandleToken = (data) => {
    setCookie("token", data, 3);
    setToken(data);
  };
  const HandleLang = (data) => {
    setLang(data);
  };
  const HandleUser = (data) => {
    setUser(data);
  };
  const HandleLanguage = (data) => {
    setLang(data);
    setCookie("language", data, 3);
    setLanguage(Lang[data]);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        logged,
        user,
        lang,
        language,
        HandleLogin,
        HandleToken,
        HandleUser,
        HandleLang,
        HandleLanguage,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
