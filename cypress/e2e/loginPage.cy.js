/// <reference types="Cypress"/>

import { loginPage } from "../POM/loginPOM";

describe("Login Page Case", () => {
    beforeEach(() => {
        cy.visit("/login");
        cy.url().should("include", "/login");
        loginPage.loginPageHeading
            .should("be.visible")
            .and("have.text", "Log in with your existing account");
    });

    it("Successfull login", () => {
        cy.intercept("POST", `${Cypress.env("apiUrl")}/login`).as(
            "successfullLogin"
        );

        cy.intercept("GET", `${Cypress.env("apiUrl")}/my-organizations`).as(
            "getMyOrganizations"
        );

        loginPage.login(
            Cypress.env("validEmail"),
            Cypress.env("validPassword")
        );

        cy.wait("@successfullLogin").then((interception) => {
            expect(interception.response.statusCode).eq(200);
            expect(interception.response.body.token).to.exist;
        });

        cy.wait("@getMyOrganizations").then((interception) => {
            expect(interception.response.statusCode).eq(200);
        });

        loginPage.loginPageHeading.should("not.exist");
        cy.url().should("include", "/my-organizations");
    });
});
