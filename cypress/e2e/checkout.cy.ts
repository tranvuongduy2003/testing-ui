describe("Login functionality", () => {
  beforeEach(() => {
    // Log in the user if necessary
    cy.visit("http://localhost:5173/auth/login");
    cy.get('[login-testid="email"]').type("customer@test.com");
    cy.get('[login-testid="password"]').type("Customer*123");
    cy.get('[login-testid="login"]').click();
    cy.url().should("include", "/");
    cy.visit("http://localhost:5173/product/1");
    cy.get('[checkout-testid="checkout"]', { timeout: 30000 }).click();
  });

  it("receipt name is empty", () => {
    cy.get('[checkout-testid="receiptPhone"]').type("0829440357");
    cy.get('[checkout-testid="receiptAddress"]').type("12 Hell Street");
    cy.get('[checkout-testid="pay"]').click();

    cy.contains("Full name is missing").should("be.visible");
  });

  it("receipt phone number is empty", () => {
    cy.get('[checkout-testid="receiptName"]').type("Test receiver full name");
    cy.get('[checkout-testid="receiptAddress"]').type("12 Hell Street");
    cy.get('[checkout-testid="pay"]').click();

    cy.contains("Phone number is missing").should("be.visible");
  });

  it("receipt address is empty", () => {
    cy.get('[checkout-testid="receiptName"]').type("Test receiver full name");
    cy.get('[checkout-testid="receiptPhone"]').type("0829440357");
    cy.get('[checkout-testid="pay"]').click();

    cy.contains("Address is missing").should("be.visible");
  });

  it("should sign up successfully", () => {
    cy.get('[checkout-testid="receiptName"]').type("Test receiver full name");
    cy.get('[checkout-testid="receiptPhone"]').type("0829440357");
    cy.get('[checkout-testid="receiptAddress"]').type("12 Hell Street");
    cy.get('[checkout-testid="pay"]').click();

    cy.url().should("eq", "http://localhost:5173/checkout/confirmation");
  });
});
