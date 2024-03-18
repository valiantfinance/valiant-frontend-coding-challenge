import { computed } from 'vue'
import PMT from '../utils/PMT'

export function useCalculateLoan (form, loanPurposeData) {
  const paymentPerPeriod = computed(() => {
    let annualInterest = 0
    const { loanAmount, repaymentPeriod, termMonths, selectedLoanPurpose } = form.value
    if (!loanAmount || !repaymentPeriod || !termMonths || !selectedLoanPurpose || !loanPurposeData) return 0

    const loanPurpose = loanPurposeData.value.find(loanPurposeDataItem => loanPurposeDataItem.value === selectedLoanPurpose)
    if (loanPurpose) {
      annualInterest = loanPurpose.annualRate
    } else {
      return 0
    }

    const ratePerPeriod = annualInterest / repaymentPeriod
    const nper = (termMonths / 12) * repaymentPeriod

    const pmtValue = PMT(ratePerPeriod, nper, loanAmount)
    return Math.abs(pmtValue).toFixed(2)
  })

  const totalRepayments = computed(() => {
    const { repaymentPeriod, termMonths } = form.value

    const nper = (termMonths / 12) * repaymentPeriod
    return (paymentPerPeriod.value * nper).toFixed(2)
  })

  return { paymentPerPeriod, totalRepayments }
}
