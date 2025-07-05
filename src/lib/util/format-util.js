// path: @/lib/util/format-util.js

/**
 * Converts a string to uppercase.
 *
 * @param {string} text - The string to convert.
 * @returns {string} The uppercase version of the input string.
 * @example
 * toUpperCase('hello'); // returns 'HELLO'
 * toUpperCase('Bingo'); // returns 'BINGO'
 */
export function toUpperCase(text) {
  return typeof text === "string" ? text.toUpperCase() : text;
}
