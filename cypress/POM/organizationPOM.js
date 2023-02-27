class OrganizationPage {
    get homePageBtn() {
        return cy.get("header").find(".vs-c-site-logo");
    }

    get ModalWindow() {
        return cy.get(".vs-c-modal");
    }

    get ModalWindowOkBtn() {
        return cy.get(".vs-c-modal").find("button").eq(1);
    }

    get navBarTitle() {
        return cy.get("header").find(".vs-u-text--uppercase");
    }

    get firstBoard() {
        return cy.get(".vs-c-organization-boards__item").first();
    }

    get addNewBoard() {
        return cy
            .get(".vs-c-organization__section")
            .find(".vs-c-organization-boards__item--add-new");
    }

    get addNewBoardWindow() {
        return cy.get(".vs-c-modal");
    }

    get addNewBoardDotLength() {
        return cy.get(".vs-c-dot-pagination").find("li");
    }

    get addNewBoardDot1() {
        return cy.get(".vs-c-dot-pagination").find("li").eq(0);
    }

    get addNewBoardDot2() {
        return cy.get(".vs-c-dot-pagination").find("li").eq(1);
    }

    get addNewBoardDot3() {
        return cy.get(".vs-c-dot-pagination").find("li").eq(2);
    }

    get addNewBoardDot4() {
        return cy.get(".vs-c-dot-pagination").find("li").eq(3);
    }

    get addNewBoardDot5() {
        return cy.get(".vs-c-dot-pagination").find("li").eq(4);
    }

    get addNewBoardWindowTitle() {
        return this.addNewBoardWindow.find("h2");
    }

    get addNewBoardOrgSelectInput() {
        return this.addNewBoardWindow.find("input").first();
    }

    get addNewBoardTitleInput() {
        return this.addNewBoardWindow.find("input").last();
    }

    get addNewBoardNextBtn() {
        return this.addNewBoardWindow.find("button").eq(2);
    }

    get addNewBoardRadioBtnKanban() {
        return this.addNewBoardWindow.find("input").eq(1);
    }

    get addNewBoardUploadBoardLogo() {
        return this.addNewBoardWindow.find("a");
    }

    get addNewBoardFinishBtn() {
        return this.addNewBoardWindow.find("button").eq(2);
    }

    createNewBoard(boardName) {
        this.addNewBoard.click();
        this.addNewBoardWindowTitle.should(($el) =>
            expect($el.text().trim()).to.equal("New Board")
        );
        this.addNewBoardDot1.should("have.class", "active");
        this.addNewBoardDot2.should("not.have.class", "active");
        this.addNewBoardNextBtn.should("be.disabled");
        this.addNewBoardTitleInput.type(boardName);
        this.addNewBoardNextBtn.should("not.be.disabled");
        this.addNewBoardNextBtn.click();
        this.addNewBoardWindowTitle.should(($el) =>
            expect($el.text().trim()).to.equal("Board Type")
        );
        this.addNewBoardRadioBtnKanban.check({ force: true });
        this.addNewBoardNextBtn.click();
        this.addNewBoardWindowTitle.should(($el) =>
            expect($el.text().trim()).to.equal("Import")
        );
        this.addNewBoardNextBtn.click();
        this.addNewBoardWindowTitle.should(($el) =>
            expect($el.text().trim()).to.equal("Board Logo")
        );
        this.addNewBoardDot4.should("have.class", "active");
        this.addNewBoardDot5.should("not.have.class", "active");
        this.addNewBoardNextBtn.click();
        this.addNewBoardWindowTitle
            .find("span")
            .last()
            .should("have.text", boardName);
        this.addNewBoardFinishBtn.click();
    }
}

export const organizationPage = new OrganizationPage();
