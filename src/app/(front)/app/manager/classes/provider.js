// PROVIDER

import { createContext, useContext, useMemo } from "react";
import { useAppContext } from "../../provider";
import { convertSelection } from "@/lib/util/convert-util";

const PageContext = createContext(null);

export function PageProvider({ children }) {
  const { optionData } = useAppContext();

  const classStatus = convertSelection(
    optionData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "classes", option_column: "class_status_id" }
  );

  const enrollmentStatus = convertSelection(
    optionData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "enrollments", option_column: "enrollment_status_id" }
  );

  const enrollmentType = convertSelection(
    optionData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "enrollments", option_column: "enrollment_type_id" }
  );

  const enrollmentPaymentType = convertSelection(
    optionData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "enrollments", option_column: "enrollment_payment_type_id" }
  );

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      classStatus,
      enrollmentStatus,
      enrollmentType,
      enrollmentPaymentType,
    }),
    [classStatus, enrollmentStatus, enrollmentType, enrollmentPaymentType]
  );

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
}

export function usePageContext() {
  return useContext(PageContext);
}
