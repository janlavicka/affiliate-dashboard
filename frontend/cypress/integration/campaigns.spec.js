describe("campaigns", () => {
  let user;
  let email;
  let password;

  beforeEach(() => {
    cy.task("user:create").then((result) => {
      user = result.user;
      email = result.email;
      password = result.password;
    });

    cy.visit("/");
  });

  afterEach(() => {
    cy.task("user:delete", user);
  });

  it("can see campaigns as a sign in user", () => {
    cy.get("input[name=email]").type(email);
    cy.get("input[name=password]").type(password);
    cy.get("button[type=submit]").click();

    cy.contains("Campaigns").click();

    cy.url().should("include", "/campaigns");

    cy.get("h1").should("have.text", "Campaigns");
    cy.get("[role=listitem]").should("have.length", 3);
  });
});
