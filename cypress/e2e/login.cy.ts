describe("Login functionality", () => {
  beforeEach(() => {
    // Log in the user if necessary
    cy.visit("http://localhost:5173/auth/login");
  });

  it("invalid email", () => {
    cy.get('[login-testid="email"]').type("invalidemail");
    cy.get('[login-testid="password"]').type("Customer*123");
    cy.get('[login-testid="login"]').click();

    cy.contains("Please enter a valid email").should("be.visible");
  });

  it("should login successfully", () => {
    cy.get('[login-testid="email"]').type("customer@test.com");
    cy.get('[login-testid="password"]').type("Customer*123");
    cy.get('[login-testid="login"]').click();

    cy.contains("Login successfully!").should("be.visible");
  });
});
