import React, { createContext, useContext, useState } from "react";

const FormContext = createContext();

export function useFormContext() {
  return useContext(FormContext);
}

export function StateProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
