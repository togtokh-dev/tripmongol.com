import { AuthContextProvider } from "Context/AuthContext";
import React from "react";
import MyRouter from "routers/index";

function App() {
  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <AuthContextProvider>
        <MyRouter />
      </AuthContextProvider>
    </div>
  );
}

export default App;
