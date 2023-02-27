/// <reference types="Cypress"/>

import { organizationPage } from "../POM/organizationPOM";
import { myOrganizationsPage } from "../POM/myOrganizations";
import { boardPage } from "../POM/boardPOM";
import { faker } from "@faker-js/faker/locale/de";

let boardName = faker.animal.fish();

describe("Boards page case", () => {
    beforeEach(() => {
        cy.intercept("GET", `${Cypress.env("apiUrl")}/my-organizations`).as(
            "loadMyOrganizations"
        );

        cy.loginViaBackend();
        cy.visit("/my-organizations");
        myOrganizationsPage.firstOrg.click();

        cy.wait("@loadMyOrganizations").then((interception) => {
            let orgId = interception.response.body[0].id;
            expect(interception.response.statusCode).eq(200);
            organizationPage.ModalWindowOkBtn.click();
            cy.url().should("contain", `/organizations/${orgId}/boards`);
        });
        organizationPage.navBarTitle
            .should("be.visible")
            .and("have.text", "Boards")
            .and("have.css", "text-transform", "uppercase");
    });

    it("Add new board", () => {
        cy.intercept("GET", `${Cypress.env("apiUrl")}/boards/**`).as(
            "getBoardPage"
        );
        organizationPage.createNewBoard(boardName);
        boardPage.boardTitle.should("exist").and("have.text", boardName);
        cy.wait("@getBoardPage").then((interception) => {
            let boardId = interception.response.body.id;
            cy.log(interception.response.body.id);
            expect(interception.response.statusCode).eq(200);
            cy.url().should("contain", `/boards/${boardId}`);
        });
    });
});
