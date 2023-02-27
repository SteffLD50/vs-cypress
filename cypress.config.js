const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        baseUrl: "https://cypress.vivifyscrum-stage.com",
    },
    env: {
        apiUrl: "https://cypress-api.vivifyscrum-stage.com/api/v2",
        validEmail: "nadjlukac.test@gmail.com",
        validPassword: "testqa22test",
    },
});
