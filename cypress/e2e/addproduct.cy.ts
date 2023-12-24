describe("Change password functionality", () => {
  beforeEach(() => {
    // Log in the user if necessary
    cy.visit("http://localhost:5173/auth/login");
    cy.get('[test-id="email"]').type("admin@test.com");
    cy.get('[test-id="password"]').type("Admin*123");
    cy.get('[test-id="btn_login"]').click();
    cy.wait(2000);
  });

  //Click button add
  it("should display error messages for blank input", () => {
    cy.visit("http://localhost:5173/admin/product-management");
    cy.wait(2000);

    cy.get('[test-id="btn_add"]').click();
    cy.wait(2000);

    //cy.get('[test-id="md_add"]').should("exist");
    cy.get('[test-id="create"]').click();

    cy.wait(1500);
  });
});
