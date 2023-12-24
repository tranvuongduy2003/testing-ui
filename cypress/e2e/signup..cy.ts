describe("Signup functionality", () => {
  beforeEach(() => {
    // Log in the user if necessary
    cy.visit("http://localhost:5173/auth/sign-up");
  });

  it("fullname is empty", () => {
    cy.get('[signup-testid="email"]').type("test@test.com");
    cy.get('[signup-testid="password"]').type("Test*123");
    cy.get('[signup-testid="signup"]').click();

    cy.contains("You must enter your fullname").should("be.visible");
  });

  it("email is empty", () => {
    cy.get('[signup-testid="fullname"]').type("Test Name");
    cy.get('[signup-testid="password"]').type("Test*123");
    cy.get('[signup-testid="signup"]').click();

    cy.contains("You must enter your email").should("be.visible");
  });

  it("email is invalid", () => {
    cy.get('[signup-testid="fullname"]').type("Test Name");
    cy.get('[signup-testid="email"]').type("invalid email");
    cy.get('[signup-testid="password"]').type("Test*123");
    cy.get('[signup-testid="signup"]').click();

    cy.contains("You must enter a valid email!").should("be.visible");
  });

  it("password is empty", () => {
    cy.get('[signup-testid="fullname"]').type("Test Name");
    cy.get('[signup-testid="email"]').type("test@test.com");
    cy.get('[signup-testid="signup"]').click();

    cy.contains("You must enter your password").should("be.visible");
  });

  it("password is less than 8 characters", () => {
    cy.get('[signup-testid="fullname"]').type("Test Name");
    cy.get('[signup-testid="email"]').type("test@test.com");
    cy.get('[signup-testid="password"]').type("1234567");
    cy.get('[signup-testid="signup"]').click();

    cy.contains("You must enter at least 8+ characters!").should("be.visible");
  });

  it("should sign up successfully", () => {
    cy.get('[signup-testid="fullname"]').type("Test Name");
    cy.get('[signup-testid="email"]').type("test@test.com");
    cy.get('[signup-testid="password"]').type("12345678");
    cy.get('[signup-testid="signup"]').click();

    cy.contains("Create new account successfully!").should("be.visible");
  });
});
