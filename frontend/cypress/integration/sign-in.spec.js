describe("sign in", () => {
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

  it("sign in with email and password and sign out", () => {
    cy.get("input[name=email]").type(email);
    cy.get("input[name=password]").type(password);
    cy.get("button[type=submit]").click();

    cy.url().should("include", "/dashboard");
    cy.get("h1").should("have.text", "Dashboard");

    cy.contains("Sign out").click();

    cy.url().should("include", "/");
  });
});
