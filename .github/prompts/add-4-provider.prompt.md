````prompt
# Generate Frontend Provider from SQL Table

## Instructions

Generate provider file for page context and state management from SQL table structure following established patterns.

## Reference Examples

**MANDATORY**: Review these files COMPLETELY before generating any code:

- **SQL Input**: [`.github/prompts/examples/table-structure-sample.sql`](./examples/table-structure-sample.sql)
- **Provider Output**: [`.github/prompts/examples/frontend-provider-sample.js`](./examples/frontend-provider-sample.js)

## Critical Requirements

- **File Location**: Save in `src/app/(front)/app/dev/`
- **File Naming**: Create provider file following kebab-case convention
  - `{tableName}/provider.js` - for page context and state management
- **Coding Style**: Follow camelCase for variables/functions, PascalCase for component names, kebab-case for file names
- **ABSOLUTE ADHERENCE**: Copy the EXACT structure from sample files - do NOT modify any patterns
- **NO CUSTOM CHANGES**: Use ONLY the patterns shown in sample files - do NOT create your own variations
- **EXACT COPY**: Follow every detail of the sample files including component structure, imports, hooks, and naming

## Template Structure

**CRITICAL**: You MUST copy the EXACT structure from sample files. Do NOT create simplified versions.

### Provider Template (COPY EXACTLY from frontend-provider-sample.js)

```javascript
// path: @/app/(front)/app/dev/{tableName}/provider.js
import { createContext, useContext, useMemo } from "react";
import { useAppContext } from "../../provider";
import { convertSelection } from "@/lib/util/convert-util";

const PageContext = createContext(null);

export function PageProvider({ children }) {
  const { optionData } = useAppContext();
  // Use the sample pattern with appropriate option conversions

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(() => ({}), []);

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
}

export function usePageContext() {
  return useContext(PageContext);
}
```

## Implementation Guidelines

1. **MANDATORY SAMPLE READING**: Read and understand EVERY LINE of the sample files before coding
2. **EXACT COPY REQUIREMENT**: Copy the complete structure from sample files - do NOT simplify or modify
3. **State Management**: Use EXACT patterns from samples for context and provider setup
4. **Provider Structure**:
   - **MUST** use `{ optionData }` destructuring from `useAppContext()` exactly as shown
   - **MUST** include sample comment structure for option conversion examples
   - **MUST** use `contextValue` variable with proper memoization pattern
   - **MUST** follow exact import and export structure from sample

## CRITICAL SAMPLE ADHERENCE

### Provider File MUST:

- Use `const { optionData } = useAppContext();` exactly as shown
- Include sample comment structure for option conversion
- Use `contextValue` variable with proper memoization
- Follow exact import and export structure from sample

## Provider File Requirements

- **MUST** destructure `{ optionData }` from `useAppContext()` exactly as shown in sample
- **MUST** include sample comment structure for option conversion examples
- **MUST** use `contextValue` variable with proper memoization pattern
- **MUST** follow exact import and export structure from sample
- **MUST** use `PageContext` for context creation
- **MUST** export both `PageProvider` and `usePageContext` functions
- **MUST** include proper imports for React hooks and utility functions

## Option Data Conversion

When using option data in the provider, follow the exact pattern from the sample:

```javascript
// Convert option data to a selection format
const enrollmentType = convertSelection(
  optionData,
  { value: "id", label: "option_label", color: "option_color" },
  { option_table: "enrollments", option_column: "enrollment_type_id" }
);
```

Replace table and column names based on your specific SQL table requirements.

## CRITICAL WARNINGS

⚠️ **ABSOLUTE REQUIREMENTS**:

- Copy EVERY LINE of structure from sample files
- Do NOT create simplified or custom versions
- Do NOT skip the memoization pattern
- Do NOT modify the context creation pattern
- Do NOT use different hook patterns than shown in samples

⚠️ **FORBIDDEN ACTIONS**:

- Creating simplified provider structures
- Using different prop names than samples
- Skipping the contextValue memoization
- Using different import patterns
- Modifying the sample's context organization

⚠️ **MANDATORY ACTIONS**:

- Read sample file completely before coding
- Copy exact import statements from samples
- Copy exact context structure from samples
- Copy exact memoization patterns from samples
- Include proper option conversion examples in comments

## Validation Checklist

- ✅ File location: `src/app/(front)/app/dev/{tableName}/provider.js`
- ✅ File naming: kebab-case convention
- ✅ **CRITICAL**: Exact sample structure copied completely
- ✅ **CRITICAL**: All sample imports included (React hooks, utility functions)
- ✅ **CRITICAL**: Context creation pattern maintained
- ✅ **CRITICAL**: Memoization pattern maintained
- ✅ **CRITICAL**: Export structure matches sample exactly
- ✅ Templates: Follow exact structure and naming patterns from samples
- ✅ Comments: Include option conversion examples as shown in sample
- ✅ State: Context provider implementation matching samples

## Response Format

### Task Completion Summary

**Files Generated**:

- `src/app/(front)/app/dev/{tableName}/provider.js`

**Provider**: ✅ Context and state management ready
**Validation**: ✅ All requirements met
**Next Steps**: Provider ready for use with list and detail pages
````
