/**
 * Parses a string value into a number by removing non-numeric characters.
 *
 * Designed for handling formatted user input such as currency values or
 * numbers containing separators. Returns null when the input does not contain
 * a valid numeric value.
 *
 * @param {string} value - The string value to parse.
 *
 * @returns {number|null} The parsed numeric value, or null when parsing fails.
 */
const parseNumber = (value) => {
  if (typeof value !== 'string') {
    return null
  }

  const digits = value.replace(/\D/g, '')

  if (!digits) {
    return null
  }

  const parsed = Number(digits)

  return Number.isFinite(parsed) ? parsed : null
}

export {
  parseNumber,
}
