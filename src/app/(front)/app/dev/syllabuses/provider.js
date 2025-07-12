// PROVIDER

import { createContext, useContext, useMemo } from "react";
import { useAppContext } from "../../provider";
import { convertSelection } from "@/lib/util/convert-util";

const PageContext = createContext(null);

export function PageProvider({ children }) {
  const { optionData } = useAppContext();

  const syllabusStatus = convertSelection(
    optionData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "syllabuses", option_column: "syllabus_status_id" }
  );

  const moduleStatus = convertSelection(
    optionData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "modules", option_column: "module_status_id" }
  );

  const lectureStatus = convertSelection(
    optionData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "lectures", option_column: "lecture_status_id" }
  );

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(
    () => ({ syllabusStatus, moduleStatus, lectureStatus }),
    [syllabusStatus, moduleStatus, lectureStatus]
  );

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
}

export function usePageContext() {
  return useContext(PageContext);
}
