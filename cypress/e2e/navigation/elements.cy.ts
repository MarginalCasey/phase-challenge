describe("Navigation Panel - Elements", () => {
  it("Should show properties panel & outline selected element in canvas", () => {
    cy.visit("/1");
    cy.contains("Rectangle 4").click();

    cy.get("[data-testid=element-properties]")
      .should("be.visible")
      .should("have.attr", "data-id", "rectangle-4");
    cy.percySnapshot(
      "Selected Rectangle 4 - click on element in navigation panel",
    );
  });
});
