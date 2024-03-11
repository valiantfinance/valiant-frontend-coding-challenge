describe('Example test', () => {
  it('runs the app', () => {
    cy.visit('http://127.0.0.1:5173/')
    cy.url().should('eq', 'http://127.0.0.1:5173/')
  })
})
