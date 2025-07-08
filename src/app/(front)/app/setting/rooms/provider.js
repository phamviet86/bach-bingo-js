// ROOMS PROVIDER

import { createContext, useContext, useMemo } from "react";
import { useAppContext } from "../../provider";
import { convertSelection } from "@/lib/util/convert-util";

const PageContext = createContext(null);

export function PageProvider({ children }) {
  const { optionData } = useAppContext();
  // See the sample below for how to use the context

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(() => ({}), []);

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
}

export function usePageContext() {
  return useContext(PageContext);
}

/* 
  Sample:
  const { optionData } = useAppContext();

  // Convert option data to a selection format
  const enrollmentType = convertSelection(
    optionData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "enrollments", option_column: "enrollment_type_id" }
  );

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      enrollmentType,
    }),
    [enrollmentType]
  );
 */
