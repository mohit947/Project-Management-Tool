describe("Dashboard", () => {
  beforeEach(() => {
    cy.visit("/auth/login");
    cy.get('input[id="email"]').type("mohitjalan947@gmail.com");
    cy.get('input[id="password"]').type("Mohit12345@");
    cy.get('button[type="submit"]').click();
  });

  it("should display the dashboard page", () => {
    cy.url().should("include", "/");
    cy.get("h1").should("contain", "Dashboard");
  });

  it("should display stat cards with project and task information", () => {
    cy.get('[data-testid="stat-cards"]').should("exist");

    cy.get('[data-testid="total-projects"]').should("exist");
    cy.get('[data-testid="total-tasks"]').should("exist");
    cy.get('[data-testid="completed-tasks"]').should("exist");
    cy.get('[data-testid="completion-rate"]').should("exist");
  });
});
