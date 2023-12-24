describe("Change password functionality", () => {
  const newPass = 12345678;
  const wrongPass = 1234568910;
  const currentPass = "Admin*123";
  beforeEach(() => {
    // Log in the user if necessary
    cy.visit("http://localhost:5173/auth/login");
    cy.get('[test-id="email"]').type("admin@test.com");
    cy.get('[test-id="password"]').type(`${currentPass}`);
    cy.get('[test-id="btn_login"]').click();

    cy.wait(2000);
  });

  //Blank value
  it("should display error messages for blank input", () => {
    // Submit without entering any data
    cy.get('[test-id="submit"]').click();

    cy.contains("Please enter current password").should("be.visible");
    cy.contains("Please enter new password").should("be.visible");
    cy.contains("Please retype new password").should("be.visible");

    cy.wait(1500);
  });

  //Invalid value
  it("should display error messages for invalid input", () => {
    cy.get('[test-id="oldPassword"]').type(`${currentPass}`);
    cy.get('[test-id="newPassword"]').type("123456");
    cy.get('[test-id="confirmedNewPassword"]').type("12345");

    cy.get('[test-id="submit"]').click();

    cy.contains("Password must be longer than or equal to 8 characters").should(
      "be.visible"
    );
    cy.contains("The two passwords that you entered do not match!").should(
      "be.visible"
    );

    cy.wait(1500);
  });

  //Wrong old password
  it("should display error messages for wrong input", () => {
    cy.get('[test-id="oldPassword"]').type(`${wrongPass}`);
    cy.get('[test-id="newPassword"]').type(`${newPass}`);
    cy.get('[test-id="confirmedNewPassword"]').type(`${newPass}`);

    cy.get('[test-id="submit"]').click();

    cy.contains("Current password doesn't match").should("be.visible");

    cy.wait(1500);
  });

  //Change successfully
  it("should allow a user to change their password successfully", () => {
    cy.get('[test-id="oldPassword"]').type(`${currentPass}`);
    cy.get('[test-id="newPassword"]').type(`${newPass}`);
    cy.get('[test-id="confirmedNewPassword"]').type(`${newPass}`);
    cy.get('[test-id="submit"]').click();

    cy.contains("Change password successfully!").should("be.visible");
  });
});
