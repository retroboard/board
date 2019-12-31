describe('Create a board', function () {
  it('Visits home page and when click on `New board` redirect to board page', function () {
    cy.visit('http://localhost:3000');
    cy.contains('New board').click();
    cy.url().should('include', '/board');
  });
});