// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Accessibility helpers using cypress-axe
import 'cypress-axe'

Cypress.Commands.add('injectAxe', () => {
  cy.window({ log: false }).then((win) => {
    // ensure axe is available via the plugin
    // cypress-axe provides the global injection helpers
  })
})

Cypress.Commands.add('checkPageA11y', (context = null, options = null) => {
  cy.injectAxe()
  cy.checkA11y(context, options)
})
