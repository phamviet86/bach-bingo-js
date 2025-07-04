// @/lib/util/convert-util.js

/**
 * Converts a string to uppercase.
 *
 * @param {string} text - The string to convert.
 * @returns {string} The uppercase version of the input string.
 * @example
 * convertToUpperCase('hello'); // returns 'HELLO'
 * convertToUpperCase('Bingo'); // returns 'BINGO'
 */
export function convertToUpperCase(text) {
  return typeof text === "string" ? text.toUpperCase() : text;
}
