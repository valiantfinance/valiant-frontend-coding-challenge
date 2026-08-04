import PMT from '@/utils/PMT'

function calculateRepayments ({
  amount,
  annualRate,
  periodsPerYear,
  termMonths,
}) {
  const ratePerPeriod = annualRate / periodsPerYear
  const numberOfPayments = (termMonths / 12) * periodsPerYear

  const repaymentPerPeriod = Math.round(
    Math.abs(PMT(ratePerPeriod, numberOfPayments, amount))
  )

  return {
    repaymentPerPeriod,
    totalRepayments: repaymentPerPeriod * numberOfPayments,
  }
}

export default calculateRepayments
