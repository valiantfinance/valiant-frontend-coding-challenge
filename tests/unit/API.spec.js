import fetchAPI from '@/utils/api'

describe('API', () => {
  it('returns the expected result for loan purposes end point', async () => {
    const result = await fetchAPI('/loan-purposes')
    const data = [{ label: 'Day-to-day capital', value: 'general', annualRate: 0.1 }, { label: 'Vehicle or transport', value: 'vehicle', annualRate: 0.045 }, { label: 'Financing a property', value: 'property', annualRate: 0.029 }]
    expect(result).toEqual(data)
  })

  it('returns the expected result for requested repayment periods end point', async () => {
    const result = await fetchAPI('/requested-repayment-periods')
    const data = [{ label: 'Weekly', value: 52 }, { label: 'Fortnightly', value: 26 }, { label: 'Monthly', value: 12 }]
    expect(result).toEqual(data)
  })

  it('returns the expected result for requested term months end point', async () => {
    const result = await fetchAPI('/requested-term-months')
    const data = [{ label: '6 months', value: 6 }, { label: '12 months', value: 12 }, { label: '2 years', value: 24 }, { label: '3 years', value: 36 }, { label: '5 years', value: 60 }, { label: '10 years', value: 120 }, { label: '20 years', value: 240 }]
    expect(result).toEqual(data)
  })
})
