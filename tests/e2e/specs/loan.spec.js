describe('Loan calculator - e2e', () => {
  const base = 'http://localhost:5000'

  beforeEach(() => {
    cy.intercept('GET', `${base}/loan-purposes`, { fixture: 'purpose.json' }).as('getPurpose')
    cy.intercept('GET', `${base}/requested-repayment-periods`, { fixture: 'period.json' }).as('getPeriod')
    cy.intercept('GET', `${base}/requested-term-months`, { fixture: 'term.json' }).as('getTerm')
    cy.visit('http://localhost:5173/')
    cy.wait(['@getPurpose', '@getPeriod', '@getTerm'])
  })

  it('loads the app and displays loan calculator', () => {
    cy.contains('Estimate your repayments in').should('be.visible')
    cy.get('#loan-purpose').should('exist')
    cy.get('#loan-period').should('exist')
    cy.get('#loan-term').should('exist')
  })

  it('calculates repayments correctly for zero-rate purpose', () => {
    // zero rate fixture for 'General' ensures deterministic result: repayments = principal / periods
    cy.get('#loan-amount').clear()
    cy.get('#loan-amount').type('12000')
    cy.get('#loan-amount').blur()
    cy.get('#loan-purpose').select('General')
    cy.get('#loan-period').select('Monthly')
    cy.get('#loan-term').select('12 months')

    // summary should show $1,000 repayments and $12,000 total (formatted without cents)
    cy.get('section[aria-labelledby="repayment-summary-heading"]').within(() => {
      cy.contains('Estimated Monthly repayments').should('exist')
      cy.get('.text-5xl').should('contain', '$1,000')

      // avoid unsafe chaining: find the term then locate its adjacent dd
      cy.contains('Total repayments').should('exist').then(($dt) => {
        const dd = $dt[0].nextElementSibling
        cy.wrap(dd).should('contain', '$12,000')
      })
    })
  })

  it('shows validation errors when inputs are invalid or below minimum', () => {
    cy.get('#loan-amount').clear()
    cy.get('#loan-amount').type('500')
    cy.get('#loan-amount').blur()
    cy.get('#loan-purpose').select('General')
    cy.get('#loan-period').select('Monthly')
    cy.get('#loan-term').select('12 months')

    // form-level alert should appear and include minimum amount message
    cy.get('[role="alert"]').should('be.visible').and('contain', 'Minimum loan amount')
  })

  it('shows API error when loan options fail to load', () => {
    // Force a failure for purpose endpoint and reload the page
    cy.intercept('GET', `${base}/loan-purposes`, { statusCode: 500, body: '' }).as('getPurposeFail')
    cy.visit('http://localhost:5173/')
    cy.wait('@getPurposeFail')

    // API error should render in the status region with role alert
    cy.get('[role="alert"]').should('be.visible').and('contain', 'Unable to load loan options')
  })
})
