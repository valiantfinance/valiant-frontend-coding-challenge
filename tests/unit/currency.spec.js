import { describe, expect, it } from 'vitest'

import { formatCurrency } from '@/utils/currency'

describe('formatCurrency', () => {
  it('formats a positive integer as AUD with no decimals', () => {
    expect(formatCurrency(1000)).toBe('$1,000')
  })

  it('groups thousands for large values', () => {
    expect(formatCurrency(20000000)).toBe('$20,000,000')
  })

  it('rounds fractional values to the nearest whole dollar', () => {
    expect(formatCurrency(1500.75)).toBe('$1,501')
  })

  it('formats zero rather than treating it as empty', () => {
    expect(formatCurrency(0)).toBe('$0')
  })

  it.each([
    ['null', null],
    ['undefined', undefined],
    ['NaN', NaN],
    ['Infinity', Infinity],
    ['-Infinity', -Infinity],
    ['a string', '1000'],
    ['an object', {}],
    ['an array', []],
    ['a boolean', true],
  ])('returns an empty string for %s', (_label, value) => {
    expect(formatCurrency(value)).toBe('')
  })
})
