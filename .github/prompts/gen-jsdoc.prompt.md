Your goal is to generate comprehensive JSDoc documentation for JavaScript/TypeScript functions.

Ask for the function name and parameters if not provided.

Requirements for JSDoc:

- Use comprehensive JSDoc comments following the example in: [lib/db/neon-db.js](../../src/lib/db/neon-db.js)
- Always include:
  - Brief function description in Vietnamese
  - Detailed usage context and purpose
  - Complete `@param` documentation with types and descriptions
  - `@returns` documentation with type and description
  - `@throws` documentation for potential errors
  - `@example` blocks showing practical usage scenarios
- Follow TypeScript-compatible JSDoc syntax:
  - Use proper type annotations (e.g., `{Function}`, `{string}`, `{Error}`)
  - Include multiple examples when function has different usage patterns
  - Document both success and error scenarios
- Code example standards:
  - Provide realistic, practical examples
  - Show both recommended and alternative usage patterns
  - Include variable declarations and context
  - Use Vietnamese comments in examples for clarity

Sample JSDoc structure based on neon-db.js:

```javascript
/**
 * [Brief description in Vietnamese]
 * [Detailed usage context and purpose]
 *
 * @param {Type} paramName - Parameter description
 * @returns {Type} Return value description
 * @throws {Error} Error condition description
 *
 * @example
 * // Usage scenario description
 * const result = functionName(param);
 * // Additional context or explanation
 *
 * @example
 * // Alternative usage scenario
 * const alternative = functionName(differentParam);
 */
```
