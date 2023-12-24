import "cypress-file-upload";
describe("Change password functionality", () => {
  const currentPass = "Admin*123";
  const filename = "french-toast.docx";
  beforeEach(() => {
    // Log in the user if necessary
    cy.visit("http://localhost:5173/auth/login");
    cy.get('[test-id="email"]').type("admin@test.com");
    cy.get('[test-id="password"]').type(`${currentPass}`);
    cy.get('[test-id="btn_login"]').click();

    cy.wait(2000);
  });

  //Successfully
  it("should allow a user to change their profile", () => {
    cy.get('[test-id="save"]').click();
    cy.wait(1500);
    cy.contains("Update profile successfully!").should("be.visible");
  });
});
