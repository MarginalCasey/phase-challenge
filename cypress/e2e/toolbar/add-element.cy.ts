describe("Toolbar - Add element", () => {
  it("Should add frame to canvas and auto select it", () => {
    cy.visit("/2");
    cy.get("[data-testid=add-frame]").click();
    cy.get("canvas").click(100, 100);

    cy.get("[data-testid=page-element-list]")
      .children()
      .should("have.length", 1);
    cy.get("[data-testid=element-properties]").should("be.visible");
    cy.percySnapshot("Added frame that is auto selected");
  });
});
