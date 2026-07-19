import { describe, expect, it } from 'vitest'

import { LOAN_LIMITS } from '@/constants/loan.js'
import { validateLoanAmount, validateRequiredSelection } from '@/validation/loanValidator'

const { MIN, MAX } = LOAN_LIMITS.AMOUNT

describe('validateLoanAmount', () => {
  it.each([
    ['null', null],
    ['undefined', undefined],
    ['an empty string', ''],
  ])('requires a value when amount is %s', (_label, value) => {
    expect(validateLoanAmount(value, MIN, MAX)).toBe('Loan amount is required')
  })

  it.each([
    ['a non-numeric string', '1000'],
    ['NaN', NaN],
    ['Infinity', Infinity],
    ['a boolean', true],
    ['an object', {}],
  ])('rejects %s as an invalid number', (_label, value) => {
    expect(validateLoanAmount(value, MIN, MAX)).toBe('Enter a valid loan amount')
  })

  it('rejects zero', () => {
    expect(validateLoanAmount(0, MIN, MAX)).toBe('Loan amount must be greater than zero')
  })

  it('rejects negative amounts', () => {
    expect(validateLoanAmount(-500, MIN, MAX)).toBe('Loan amount must be greater than zero')
  })

  it('rejects amounts below the minimum', () => {
    expect(validateLoanAmount(500, MIN, MAX)).toBe('Minimum loan amount is $1,000')
  })

  it('rejects amounts above the maximum', () => {
    expect(validateLoanAmount(30000000, MIN, MAX)).toBe('Maximum loan amount is $20,000,000')
  })

  it('accepts the minimum amount as valid (inclusive boundary)', () => {
    expect(validateLoanAmount(MIN, MIN, MAX)).toBeNull()
  })

  it('accepts the maximum amount as valid (inclusive boundary)', () => {
    expect(validateLoanAmount(MAX, MIN, MAX)).toBeNull()
  })

  it('accepts an amount within range', () => {
    expect(validateLoanAmount(5000, MIN, MAX)).toBeNull()
  })
})

describe('validateRequiredSelection', () => {
  it.each([
    ['null', null],
    ['undefined', undefined],
    ['an empty string', ''],
  ])('requires a value when the selection is %s', (_label, value) => {
    expect(validateRequiredSelection(value, 'Loan term')).toBe('Loan term is required')
  })

  it('treats a numeric 0 as a valid selection, not a missing value', () => {
    expect(validateRequiredSelection(0, 'Loan purpose')).toBeNull()
  })

  it('accepts a non-empty string selection', () => {
    expect(validateRequiredSelection('general', 'Loan purpose')).toBeNull()
  })

  it('accepts a non-zero numeric selection', () => {
    expect(validateRequiredSelection(12, 'Repayment period')).toBeNull()
  })
})
