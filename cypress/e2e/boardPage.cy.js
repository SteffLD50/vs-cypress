/// <reference types="Cypress"/>

import { boardPage } from "../POM/boardPOM";
import { organizationPage } from "../POM/organizationPOM";
import { myOrganizationsPage } from "../POM/myOrganizations";

describe("Board page case", () => {
    beforeEach(() => {
        cy.intercept("GET", `${Cypress.env("apiUrl")}/boards/**`).as(
            "getBoardPage"
        );
        cy.loginViaBackend();
        cy.visit("/my-organizations");
        myOrganizationsPage.firstOrg.click();
        organizationPage.ModalWindowOkBtn.click();
        organizationPage.firstBoard.click();

        cy.wait("@getBoardPage").then((interception) => {
            expect(interception.response.statusCode).eq(200);
        });
    });

    it("Delete board", () => {
        cy.intercept(
            "GET",
            `${Cypress.env("apiUrl")}/boards/**/integrations`
        ).as("getConfigureBtn");
        boardPage.configurationBtn.click();
        cy.wait("@getConfigureBtn").then((interception) => {
            expect(interception.response.statusCode).eq(200);
            // cy.get("button[vs-c-btn]");
        });
        cy.get(".vs-c-settings-section-form")
            .find(".vs-c-btn")
            .eq(-1)
            .click({ force: true });
        cy.get(".vs-c-modal").find("button").eq(-1).click();
    });
});
