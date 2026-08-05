const loanPurposes = [
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
]

const repaymentPeriods = [
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
]

const loanTerms = [
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
]

function stubLoanOptions () {
  cy.intercept('GET', '**/loan-purposes', {
    statusCode: 200,
    body: loanPurposes,
  })

  cy.intercept('GET', '**/requested-repayment-periods', {
    statusCode: 200,
    body: repaymentPeriods,
  })

  cy.intercept('GET', '**/requested-term-months', {
    statusCode: 200,
    body: loanTerms,
  })
}

describe('Loan repayment calculator', () => {
  it('calculates the supplied repayment example', () => {
    stubLoanOptions()

    cy.visit('http://localhost:5173')

    cy.get('#loan-amount')
      .type('30000')

    cy.get('#loan-purpose')
      .select('Day-to-day capital')

    cy.get('#repayment-period')
      .select('Monthly')

    cy.get('#loan-term')
      .select('2 years')

    cy.get('[aria-label="Repayment estimate"]')
      .within(() => {
        cy.contains('$1,384')
          .should('be.visible')

        cy.contains('Monthly repayments')
          .should('be.visible')

        cy.contains('$33,216')
          .should('be.visible')

        cy.contains('Total repayments')
          .should('be.visible')
      })
  })

  it('shows validation and hides the estimate for an invalid amount', () => {
    stubLoanOptions()

    cy.visit('http://localhost:5173')

    cy.get('#loan-amount')
      .type('999')

    cy.get('#loan-amount')
      .blur()

    cy.get('#loan-amount')
      .should('have.attr', 'aria-invalid', 'true')
      .and('have.attr', 'aria-describedby', 'loan-amount-error')

    cy.get('#loan-amount-error')
      .should('be.visible')
      .and('contain', 'Enter an amount of at least $1,000.')

    cy.get('[aria-label="Repayment estimate"]')
      .should('not.exist')
  })

  it('normalises non-digit characters in the loan amount', () => {
    stubLoanOptions()

    cy.visit('http://localhost:5173')

    cy.get('#loan-amount')
      .type('$30,000abc')

    cy.get('#loan-amount')
      .should('have.value', '30000')
  })

  it('recovers after the calculator options API fails', () => {
    cy.intercept('GET', 'http://localhost:5000/loan-purposes', {
      statusCode: 200,
      body: loanPurposes,
    }).as('loanPurposesSuccess')

    cy.intercept(
      {
        method: 'GET',
        url: 'http://localhost:5000/loan-purposes',
        times: 1,
      },
      {
        statusCode: 500,
        body: {},
      }
    ).as('loanPurposesFailure')

    cy.intercept('GET', 'http://localhost:5000/requested-repayment-periods', {
      statusCode: 200,
      body: repaymentPeriods,
    })

    cy.intercept('GET', 'http://localhost:5000/requested-term-months', {
      statusCode: 200,
      body: loanTerms,
    })

    cy.visit('http://localhost:5173')

    cy.wait('@loanPurposesFailure')

    cy.contains("We couldn't load the calculator options.")
      .should('be.visible')

    cy.contains('button', 'Try again')
      .should('be.visible')

    cy.get('#loan-amount')
      .should('not.exist')

    cy.contains('button', 'Try again')
      .click()

    cy.wait('@loanPurposesSuccess')

    cy.get('#loan-amount')
      .should('be.visible')

    cy.get('#loan-purpose')
      .should('contain', 'Day-to-day capital')

    cy.contains("We couldn't load the calculator options.")
      .should('not.exist')
  })
})
