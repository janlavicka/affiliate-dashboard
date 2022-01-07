describe("protected routes", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("redirects from protected urls to sign in page", () => {
    cy.visit("/dashboard");
    cy.url().should("not.include", "/dashboard");

    cy.visit("/campaigns");
    cy.url().should("not.include", "/campaigns");

    cy.visit("/connections");
    cy.url().should("not.include", "/connections");

    cy.visit("/connections/create/ehub-cz");
    cy.url().should("not.include", "/connections/create/ehub-cz");
  });
});
