describe('Login Page', () => {
  it('should display login form', () => {
    cy.visit('/login'); // Replace with your login page URL
    cy.get('form').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
  });

  it('should show an error for invalid login', () => {
    cy.visit('/login'); // Replace with your login page URL
    // Fill in the login form
    cy.get('input[name="email"]').type('invalid@example.com');
    cy.get('input[name="password"]').type('invalidpassword');

    // Submit the form
    cy.get('form').submit();

    cy.contains('No user found').should('exist'); // Customize based on your error message
  });

  it('should login successfully', () => {
    cy.visit('/login'); // Replace with your login page URL
    cy.get('input[name="email"]').type('admin@learnify.com');
    cy.get('input[name="password"]').type('Admin@123');

    // Submit the form
    cy.get('form').submit();
    cy.contains('Successfully logged in user!').should('exist'); // Customize based on your error message
  });
});
