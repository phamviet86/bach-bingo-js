// path: @/component/hook/useTheme.js

"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

/**
 * Custom hook để quản lý theme mode và đồng bộ giữa các tab
 * @param {string} defaultMode - Theme mode mặc định ('light', 'dark', 'auto')
 * @returns {Object} { themeMode, isDarkTheme, setTheme }
 */
export function useTheme(defaultMode = "auto") {
  // Theme state management: 'light', 'dark', 'auto' - lưu trong localStorage
  const [themeMode, setThemeModeState] = useLocalStorage(
    "app-theme-mode",
    defaultMode
  );
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Handle auto theme detection
  useEffect(() => {
    const updateTheme = () => {
      if (themeMode === "auto") {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDarkTheme(mediaQuery.matches);
      } else {
        setIsDarkTheme(themeMode === "dark");
      }
    };

    // Cập nhật theme ngay lập tức
    updateTheme();

    // Chỉ lắng nghe media query khi mode là auto
    if (themeMode === "auto") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleMediaQueryChange = (e) => setIsDarkTheme(e.matches);
      mediaQuery.addEventListener("change", handleMediaQueryChange);
      return () =>
        mediaQuery.removeEventListener("change", handleMediaQueryChange);
    }
  }, [themeMode]);

  // Đồng bộ theme giữa các tab
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "app-theme-mode" && e.newValue !== null) {
        const newThemeMode = JSON.parse(e.newValue);
        if (newThemeMode !== themeMode) {
          setThemeModeState(newThemeMode);
        }
      }
    };

    // Lắng nghe thay đổi localStorage từ các tab khác
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [themeMode, setThemeModeState]);

  // Function để thay đổi theme mode
  const setTheme = useCallback(
    (mode) => {
      if (["light", "dark", "auto"].includes(mode)) {
        setThemeModeState(mode);
      } else {
        console.warn(
          `Invalid theme mode: ${mode}. Valid options are: 'light', 'dark', 'auto'`
        );
      }
    },
    [setThemeModeState]
  );

  return {
    themeMode,
    isDarkTheme,
    setTheme,
  };
}
