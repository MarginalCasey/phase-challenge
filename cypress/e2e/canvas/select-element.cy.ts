describe("Canvas - Select Element", () => {
  it("Should show properties panel & outline selected element in canvas", () => {
    cy.visit("/1");
    cy.get("canvas").click(300, 500);

    cy.get("[data-testid=element-properties]")
      .should("be.visible")
      .should("have.attr", "data-id", "rectangle-4");
    cy.percySnapshot("Selected Rectangle 4 - click on canvas");
  });
});
