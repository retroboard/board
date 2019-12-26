describe('Cypress', () => {
  it('is working', () => {
    expect(true).to.equal(true);
  });
});

describe('Knowledge Base Application', () => {
  it('visits the app', () => {
    cy.visit('/');
  });
});

