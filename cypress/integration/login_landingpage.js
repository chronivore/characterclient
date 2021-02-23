describe("login page", () => {
  it("can be navigated to", () => {
    cy.visit("localhost:3000/login");
  });
  it("can accept e-mail address", () => {
    cy.get("#email")
      .type("nathangropp@gmail.com")
      .should("have.value", "nathangropp@gmail.com");
  });
  it("can accept password", () => {
    cy.get("#password").type("Covenant1").should("have.value", "Covenant1");
  });
  it("can log in", () => {
    cy.get("button").click();
    cy.url().should("include", "/login");
  });
});

describe("landing page", () => {
  it("can navigate", () => {
    cy.get("#newcharacter").click();
    cy.url().should("include", "/newcharacter");
  });
  it('can return home', () => {
      cy.get('#Home').click();
  })
  it('can log out', () => {
      cy.get('#Logout').click();
  })
});
