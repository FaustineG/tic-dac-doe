// https://on.cypress.io/api

describe('Main test', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'Tic Dac Doe')
  })

  it('can play in the first cell', () => {
    cy.visit('/')
    cy.get('[data-cy="cell"]').first().click()
    cy.get('[data-cy="cell"]').first().should('have.value', 'X')
  })
})
