// PROVIDER

import { createContext, useContext, useMemo } from "react";
import { useAppContext } from "../../provider";
import { convertSelection } from "@/lib/util/convert-util";

const PageContext = createContext(null);

export function PageProvider({ children }) {
  const { optionData } = useAppContext();

  const shiftStatus = convertSelection(
    optionData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "shifts", option_column: "shift_status_id" }
  );

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(() => ({ shiftStatus }), [shiftStatus]);

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
}

export function usePageContext() {
  return useContext(PageContext);
}
