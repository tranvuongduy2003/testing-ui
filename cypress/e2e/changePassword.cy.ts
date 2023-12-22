describe("Change password functionality", () => {
  beforeEach(() => {
    // Log in the user if necessary
    cy.visit("http://localhost:5173/auth/login");
    cy.get('[test-id="email"]').type("Woodrow14@gmail.com");
    cy.get('[test-id="password"]').type("123456");
    cy.get('[type="submit"]').click();
  });

  //Change successfully
  it("should allow a user to change their password successfully", () => {
    cy.get('[test-id="oldPassword"]').type("123456");
    cy.get('[test-id="newPassword"]').type("newpassword456");
    cy.get('[test-id="confirmedNewPassword"]').type("newpassword456");
    cy.get('[test-id="submit"]').click();

    cy.contains("Change password successfully!").should("be.visible");
  });

  //
});
