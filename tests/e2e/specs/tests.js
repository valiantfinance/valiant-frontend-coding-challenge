describe('Example test', () => {
  it('runs the app', () => {
    cy.visit('http://localhost:5173/')
    cy.url().should('eq', 'http://localhost:5173/')
  })
})
