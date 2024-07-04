describe("Navigation Panel - Pages", () => {
  it("Should navigate to empty page", () => {
    cy.visit("/");
    cy.contains("Empty Page").click();

    cy.url().should("include", "/2");
    cy.contains("Empty Page").should("have.css", "font-weight", "500");
  });

  it("Should navigate to page with elements", () => {
    cy.visit("/");
    cy.contains("Page with elements").click();

    cy.url().should("include", "/1");
    cy.contains("Page with elements").should("have.css", "font-weight", "500");

    cy.get("[data-testid=page-element-list]")
      .children()
      .should("have.length", 4);
    cy.get("[data-testid=element-0-element-list]")
      .children()
      .should("have.length", 2);
  });
});
