describe("Navigation Panel - Elements", () => {
  it("Should show properties panel & outline selected element in canvas", () => {
    cy.visit("/1");
    cy.contains("Rectangle 4").click();

    cy.get("[data-testid=element-rectangle-4-properties]").should("be.visible");
    cy.percySnapshot("Selected Rectangle 4");
  });
});
