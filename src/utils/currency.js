/**
 * Formats a numeric value as Australian Dollar currency.
 *
 * Returns an empty string when the provided value is not a valid finite number.
 * Currency values are rounded to whole dollars with no decimal places.
 *
 * @param {number} value - The numeric value to format.
 * @returns {string} The formatted AUD currency string or an empty string for invalid input.
 */
const formatCurrency = (value) => {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return ''
  }

  return value.toLocaleString('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  })
}

export {
  formatCurrency,
}
