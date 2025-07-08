import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useFetch } from "@/component/hook";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const { useFetchList } = useFetch();

  // Theme state management: 'light', 'dark', 'auto'
  const [themeMode, setThemeMode] = useState("auto");
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Handle auto theme detection
  useEffect(() => {
    if (themeMode === "auto") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setIsDarkTheme(mediaQuery.matches);

      const handleChange = (e) => setIsDarkTheme(e.matches);
      mediaQuery.addEventListener("change", handleChange);

      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      setIsDarkTheme(themeMode === "dark");
    }
  }, [themeMode]);

  // Fetch option data from the API
  const { data: optionData = [] } = useFetchList("/api/options"); // cache được khởi tạo và lưu tại đây

  const setTheme = (mode) => {
    setThemeMode(mode);
  };

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      optionData,
      isDarkTheme,
      themeMode,
      setTheme,
    }),
    [optionData, isDarkTheme, themeMode]
  );

  // Provide the context to children components
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
