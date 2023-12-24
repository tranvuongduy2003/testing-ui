describe("Change password functionality", () => {
  beforeEach(() => {
    // Log in the user if necessary
    cy.visit("http://localhost:5173/auth/login");
    cy.get('[test-id="email"]').type("admin@test.com");
    cy.get('[test-id="password"]').type("Admin*123");
    cy.get('[test-id="btn_login"]').click();

    cy.wait(2000);
    cy.visit("http://localhost:5173/admin/product-management");

    cy.get('[test-id="btn_edit"]', { timeout: 2000 }).first().click();

    cy.wait(1500);
    cy.get('[test-id="btn_cancel"]', { timeout: 2000 }).click();
    cy.get('[test-id="btn_edit"]').first().click();
    cy.wait(1500);
  });

  //Blank name
  it("should display error messages for blank name input", () => {
    cy.get('[test-id="name"]').clear();

    cy.get('[test-id="btn_save"]').click();

    cy.contains("name should not be empty").should("be.visible");
    cy.wait(1500);
  });

  //Blank des
  it("should display error messages for blank name input", () => {
    cy.get('[test-id="des"]').clear();

    cy.get('[test-id="btn_save"]').click();

    cy.contains("desc should not be empty").should("be.visible");
    cy.wait(3000);
  });

  //Blank importprice
  it("should display error messages for blank name input", () => {
    cy.get('[test-id="importprice"]').clear();
    cy.get('[test-id="price"]').clear();
    cy.get('[test-id="inventory"]').clear();

    cy.get('[test-id="btn_save"]').click();

    cy.contains(
      "notNull Violation: ProductModel.price cannot be null, notNull Violation: ProductModel.importPrice cannot be null, notNull Violation: ProductModel.inventory cannot be null"
    ).should("be.visible");
    cy.wait(1500);
  });

  //Delete product
  it("should allow a user to deleter product successfully", () => {
    cy.get('[test-id="btn_delete"]').click();
    cy.contains("Delete product successfully!").should("be.visible");

    cy.wait(1500);
  });
});
