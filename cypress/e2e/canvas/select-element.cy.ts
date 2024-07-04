describe("Canvas - Select Element", () => {
  it("Should show properties panel & outline selected element in canvas", () => {
    cy.visit("/1");
    cy.get("canvas").click(300, 500);

    cy.get("[data-testid=element-rectangle-4-properties]").should("be.visible");
    cy.percySnapshot("Selected Rectangle 4 - click on canvas");
  });
});
