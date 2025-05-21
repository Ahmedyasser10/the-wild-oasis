import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();
function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");
  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("ligth-mode");
      } else {
        document.documentElement.classList.remove("dark-mode");
        document.documentElement.classList.add("ligth-mode");
      }
    },
    [isDarkMode]
  );
  function toggleDarkMode() {
    setIsDarkMode((DarkMode) => !DarkMode);
  }
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkModeContext was used outside DarkModeProvider");
  return context;
}
export { DarkModeProvider, useDarkMode };
