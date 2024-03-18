import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3000

app.use(cors())

app.get('/loan-purposes', (req, res) => {
  res.json([
    {
      label: 'Day-to-day capital',
      value: 'general',
      annualRate: 0.1,
    },
    {
      label: 'Vehicle or transport',
      value: 'vehicle',
      annualRate: 0.045,
    },
    {
      label: 'Financing a property',
      value: 'property',
      annualRate: 0.029,
    },
  ])
})

app.get('/requested-repayment-periods', (req, res) => {
  res.json([
    {
      label: 'Weekly',
      value: 52,
    },
    {
      label: 'Fortnightly',
      value: 26,
    },
    {
      label: 'Monthly',
      value: 12,
    },
  ])
})

app.get('/requested-term-months', (req, res) => {
  res.json([
    {
      label: '6 months',
      value: 6,
    },
    {
      label: '12 months',
      value: 12,
    },
    {
      label: '2 years',
      value: 24,
    },
    {
      label: '3 years',
      value: 36,
    },
    {
      label: '5 years',
      value: 60,
    },
    {
      label: '10 years',
      value: 120,
    },
    {
      label: '20 years',
      value: 240,
    },
  ])
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`)
})
