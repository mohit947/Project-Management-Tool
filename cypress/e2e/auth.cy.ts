describe("Authentication", () => {
  it("should allow a user to sign up", () => {
    cy.visit("/auth/signup");
    cy.get('input[id="name"]').type("Test User");
    cy.get('input[id="email"]').type(`test-${Date.now()}@test.com`);
    cy.get('input[id="password"]').type("Password123!");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/");
  });

  it("should allow a user to log in", () => {
    cy.visit("/auth/login");
    cy.get('input[id="email"]').type("mohitjalan947@gmail.com");
    cy.get('input[id="password"]').type("Mohit12345@");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/");
  });

  it("should display error for invalid credentials", () => {
    cy.visit("/auth/login");
    cy.get('input[id="email"]').type("mohitjalan947@gmail.com");
    cy.get('input[id="password"]').type("WrongPassword");
    cy.get('button[type="submit"]').click();

    cy.contains("Invalid email or password").should("be.visible");
  });
});
