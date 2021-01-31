/// <reference types="Cypress" />

describe("Search Tests", () => {
    it("searches for term lol & displays matching results", () => {
        cy.visit("http://localhost:3000")
        cy.get("input[name=search-bar]").type("lol", { delay: 100 })
        cy.contains("Lolworth ( 52.257890.00086 )")
        cy.contains("Lolworth ( 52.25649-0.00207 )")
        cy.contains("Sloley ( 52.763631.40277 )")
    })
})
