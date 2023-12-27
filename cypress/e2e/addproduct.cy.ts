describe("Change password functionality", () => {
  beforeEach(() => {
    // Log in the user if necessary
    cy.visit("http://localhost:5173/auth/login");
    cy.get('[test-id="email"]').type("admin@test.com");
    cy.get('[test-id="password"]').type("Admin*123");
    cy.get('[test-id="btn_login"]').click();

    cy.wait(2000);
    cy.visit("http://localhost:5173/admin/product-management");

    cy.get('[test-id="btn_add"]', { timeout: 2000 }).first().click();

    cy.wait(1500);
  });

  it("should add new product successfully", () => {
    cy.get('[addproduct-testid="name"]').type("Product test name");
    cy.get('[addproduct-testid="desc"]').type("Product test description");
    cy.get('[addproduct-testid="importPrice"]').type("99999");
    cy.get('[addproduct-testid="price"]').type("111111");
    cy.get('[addproduct-testid="inventory"]').type("999");
    cy.get('[addproduct-testid="brand"]').click();
    cy.get("#brandName_list")
      .parent()
      .find(".ant-select-item-option")
      .first()
      .click();
    cy.get('[addproduct-testid="category"]').click();
    cy.get("#categoryId_list")
      .parent()
      .find(".ant-select-item-option")
      .first()
      .click();
    cy.get('[addproduct-testid="create"]').click();

    cy.contains("Create new product successfully!").should("be.visible");
  });

  it("name is empty", () => {
    cy.get('[addproduct-testid="desc"]').type("Product test description");
    cy.get('[addproduct-testid="importPrice"]').type("99999");
    cy.get('[addproduct-testid="price"]').type("111111");
    cy.get('[addproduct-testid="inventory"]').type("999");
    cy.get('[addproduct-testid="brand"]').click();
    cy.get("#brandName_list")
      .parent()
      .find(".ant-select-item-option")
      .first()
      .click();
    cy.get('[addproduct-testid="category"]').click();
    cy.get("#categoryId_list")
      .parent()
      .find(".ant-select-item-option")
      .first()
      .click();
    cy.get('[addproduct-testid="create"]').click();

    cy.contains("You must enter product name").should("be.visible");
  });

  it("description is empty", () => {
    cy.get('[addproduct-testid="name"]').type("Product test name");
    cy.get('[addproduct-testid="importPrice"]').type("99999");
    cy.get('[addproduct-testid="price"]').type("111111");
    cy.get('[addproduct-testid="inventory"]').type("999");
    cy.get('[addproduct-testid="brand"]').click();
    cy.get("#brandName_list")
      .parent()
      .find(".ant-select-item-option")
      .first()
      .click();
    cy.get('[addproduct-testid="category"]').click();
    cy.get("#categoryId_list")
      .parent()
      .find(".ant-select-item-option")
      .first()
      .click();
    cy.get('[addproduct-testid="create"]').click();

    cy.contains("You must enter product description").should("be.visible");
  });

  it("import price is empty", () => {
    cy.get('[addproduct-testid="name"]').type("Product test name");
    cy.get('[addproduct-testid="desc"]').type("Product test description");
    cy.get('[addproduct-testid="price"]').type("111111");
    cy.get('[addproduct-testid="inventory"]').type("999");
    cy.get('[addproduct-testid="brand"]').click();
    cy.get("#brandName_list")
      .parent()
      .find(".ant-select-item-option")
      .first()
      .click();
    cy.get('[addproduct-testid="category"]').click();
    cy.get("#categoryId_list")
      .parent()
      .find(".ant-select-item-option")
      .first()
      .click();
    cy.get('[addproduct-testid="create"]').click();

    cy.contains("You must enter product import price").should("be.visible");
  });

  it("price is empty", () => {
    cy.get('[addproduct-testid="name"]').type("Product test name");
    cy.get('[addproduct-testid="desc"]').type("Product test description");
    cy.get('[addproduct-testid="importPrice"]').type("99999");
    cy.get('[addproduct-testid="inventory"]').type("999");
    cy.get('[addproduct-testid="brand"]').click();
    cy.get("#brandName_list")
      .parent()
      .find(".ant-select-item-option")
      .first()
      .click();
    cy.get('[addproduct-testid="category"]').click();
    cy.get("#categoryId_list")
      .parent()
      .find(".ant-select-item-option")
      .first()
      .click();
    cy.get('[addproduct-testid="create"]').click();
    cy.contains("You must enter product price").should("be.visible");
  });

  it("inventory is empty", () => {
    cy.get('[addproduct-testid="name"]').type("Product test name");
    cy.get('[addproduct-testid="desc"]').type("Product test description");
    cy.get('[addproduct-testid="importPrice"]').type("99999");
    cy.get('[addproduct-testid="price"]').type("111111");
    cy.get('[addproduct-testid="brand"]').click();
    cy.get("#brandName_list")
      .parent()
      .find(".ant-select-item-option")
      .first()
      .click();
    cy.get('[addproduct-testid="category"]').click();
    cy.get("#categoryId_list")
      .parent()
      .find(".ant-select-item-option")
      .first()
      .click();
    cy.get('[addproduct-testid="create"]').click();

    cy.contains("You must enter product inventory").should("be.visible");
  });

  it("brand is empty", () => {
    cy.get('[addproduct-testid="name"]').type("Product test name");
    cy.get('[addproduct-testid="desc"]').type("Product test description");
    cy.get('[addproduct-testid="importPrice"]').type("99999");
    cy.get('[addproduct-testid="price"]').type("111111");
    cy.get('[addproduct-testid="inventory"]').type("999");
    cy.get('[addproduct-testid="category"]').click();
    cy.get("#categoryId_list")
      .parent()
      .find(".ant-select-item-option")
      .first()
      .click();
    cy.get('[addproduct-testid="create"]').click();

    cy.contains("You must select product brand").should("be.visible");
  });

  it("category is empty", () => {
    cy.get('[addproduct-testid="name"]').type("Product test name");
    cy.get('[addproduct-testid="desc"]').type("Product test description");
    cy.get('[addproduct-testid="importPrice"]').type("99999");
    cy.get('[addproduct-testid="price"]').type("111111");
    cy.get('[addproduct-testid="inventory"]').type("999");
    cy.get('[addproduct-testid="brand"]').click();
    cy.get("#brandName_list")
      .parent()
      .find(".ant-select-item-option")
      .first()
      .click();
    cy.get('[addproduct-testid="create"]').click();

    cy.contains("You must select product category").should("be.visible");
  });
});
