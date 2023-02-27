class MyOrganizationsPage {
    get firstOrg() {
        return cy
            .get(".vs-c-my-organizations-item-wrapper")
            .eq(0)
            .find(".organization-list-item")
            .first();
    }
}

export const myOrganizationsPage = new MyOrganizationsPage();
