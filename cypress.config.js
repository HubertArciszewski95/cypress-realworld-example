const { defineConfig } = require("cypress");
const axios = require("./frontend/node_modules/axios");

module.exports = defineConfig({
  env: {
    apiUrl: "http://localhost:3000/api"
  },
  e2e: {
    baseUrl: "http://localhost:3000/#",
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/**/*.cy.ts",
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: false,
    watchForFileChanges: false,
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      configFile: "reporter-config.json",
    },
    
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);

      on("task", {
        async "db:seed"() {
          const { data } = await axios.post("http://localhost:3001/api/testData/seed");
          return data;
        },
      });
    },
  },
});
