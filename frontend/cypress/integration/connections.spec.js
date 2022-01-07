import faker from "faker";

describe("connections", () => {
  let user;
  let email;
  let password;

  beforeEach(() => {
    faker.seed(123);

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

  it("can see connections as a sign in user", () => {
    cy.get("input[name=email]").type(email);
    cy.get("input[name=password]").type(password);
    cy.get("button[type=submit]").click();

    cy.contains("Connections").click();

    cy.url().should("include", "/connections");

    cy.get("h1").should("have.text", "Connections");
    cy.get("[role=listitem]").should("have.length", 1);
  });

  it("can import data from connection", () => {
    // login
    cy.intercept("POST", "*token*").as("auth");

    cy.get("input[name=email]").type(email);
    cy.get("input[name=password]").type(password);
    cy.get("button[type=submit]").click();

    cy.wait("@auth");

    cy.visit("/connections");

    // import data
    cy.intercept("POST", "/api/ehub-cz/import", (req) => {
      req.reply({ body: "Import finisted", delay: 3000 });
    });

    cy.contains("Import").click();
  });

  it("can create new connection with varification", () => {
    // login
    cy.intercept("POST", "*token*").as("auth");

    cy.get("input[name=email]").type(email);
    cy.get("input[name=password]").type(password);
    cy.get("button[type=submit]").click();

    cy.wait("@auth");

    cy.visit("/connections/create/ehub-cz");

    // failed varification
    cy.intercept("POST", "/api/ehub-cz/varify", (req) => {
      req.reply({ body: { varified: false }, delay: 500 });
    });

    const name = faker.random.word();

    cy.get("input[name=name]").type(name);
    cy.get("input[name=publisher_id]").type(faker.datatype.uuid());
    cy.get("input[name=api_key]").type(faker.datatype.uuid());
    cy.get("button[type=submit]").click();

    cy.get('[role="alert"]').should(
      "have.text",
      "Your publisher ID or API key is invalid.",
    );

    // success varification
    cy.intercept("POST", "/api/ehub-cz/varify", (req) => {
      req.reply({ body: { varified: true }, delay: 500 });
    });

    cy.get("button[type=submit]").click();

    cy.url().should("include", "/connections");
    cy.get("[role=listitem]")
      .should("have.length", 2)
      .should("include.text", name);
  });
});
