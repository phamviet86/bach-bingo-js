// PROVIDER

import { createContext, useContext, useMemo } from "react";
import { useAppContext } from "../../provider";
import { convertSelection } from "@/lib/util/convert-util";
import { useFetch } from "@/component/hook";

const PageContext = createContext(null);

export function PageProvider({ children }) {
  const { optionData } = useAppContext();
  const { useFetchList } = useFetch();

  const userStatus = convertSelection(
    optionData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "users", option_column: "user_status_id" }
  );

  const roleStatus = convertSelection(
    optionData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "roles", option_column: "role_status_id" }
  );

  const { data: roleData = [] } = useFetchList("/api/roles");

  const roleList = convertSelection(roleData, {
    value: "role_name",
    label: "role_name",
  });

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(
    () => ({ userStatus, roleStatus, roleList }),
    [userStatus, roleStatus, roleList]
  );

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
}

export function usePageContext() {
  return useContext(PageContext);
}
