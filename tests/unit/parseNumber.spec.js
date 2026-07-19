import { describe, expect, it } from 'vitest'

import { parseNumber } from '@/utils/parseNumber'

describe('parseNumber', () => {
  it('parses a plain digit string', () => {
    expect(parseNumber('1000')).toBe(1000)
  })

  it('strips non-numeric characters such as currency symbols and separators', () => {
    expect(parseNumber('$1,000')).toBe(1000)
  })

  it('parses a string of only zeros as zero rather than null', () => {
    expect(parseNumber('000')).toBe(0)
  })

  it('strips leading zeros', () => {
    expect(parseNumber('0000123')).toBe(123)
  })

  it.each([
    ['an empty string', ''],
    ['a string with no digits', '$'],
    ['whitespace only', '   '],
  ])('returns null for %s', (_label, value) => {
    expect(parseNumber(value)).toBeNull()
  })

  it.each([
    ['a number', 1000],
    ['null', null],
    ['undefined', undefined],
    ['an object', {}],
    ['an array', []],
    ['a boolean', true],
  ])('returns null for non-string input (%s)', (_label, value) => {
    expect(parseNumber(value)).toBeNull()
  })

  it('returns null when the digit string overflows to Infinity', () => {
    expect(parseNumber('9'.repeat(400))).toBeNull()
  })
})
