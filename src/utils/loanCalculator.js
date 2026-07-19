import PMT from '@/utils/PMT'

/**
 * Calculates loan repayment summary details.
 *
 * Uses the PMT formula to calculate the repayment amount per period
 * and returns the rounded repayment amount along with the total repayment
*
 * amount over the loan term.
 * @param {Object} options - Loan calculation options.
 * @param {number} options.amount - The loan principal amount.
 * @param {number} options.period - The number of repayment periods per year.
 * @param {number} options.purpose - The annual interest rate based on purpose.
 * @param {number} options.term - The loan duration in years.
 *
 * @returns {Object} The calculated loan repayment summary.
 * @returns {number} returns.monthlyRepayments - The repayment amount per month.
 * @returns {number} returns.totalRepayments - The total amount repayable over the loan term.
 */
const calculateLoanSummary = ({
  amount,
  period,
  purpose,
  term,
}) => {
  const ratePerPeriod = purpose / period
  const totalPeriods = term * (period / 12)
  const repaymentPerPeriod = PMT(ratePerPeriod, totalPeriods, amount)
  const roundedRepayment = Number(Math.abs(repaymentPerPeriod).toFixed(2))

  return {
    monthlyRepayments: roundedRepayment,
    totalRepayments: Number((roundedRepayment * totalPeriods).toFixed(2)),
  }
}

export {
  calculateLoanSummary,
}
