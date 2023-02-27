class BoardPage {
    get boardTitle() {
        return cy.get("header").find("h1").find("span").eq(1);
    }

    get configurationBtn() {
        return cy.get("li[data-cy='board-configuration']");
    }
}

export const boardPage = new BoardPage();
