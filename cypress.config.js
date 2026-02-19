const { defineConfig } = require("cypress");

module.exports = defineConfig({

  video: true,
  screenshotOnRunFailure: true,

  defaultCommandTimeout: 8000,
  pageLoadTimeout: 60000,

  viewportWidth: 1280,
  viewportHeight: 720,

  e2e: {
    baseUrl: "http://localhost:5173",

    watchForFileChanges: false,
    numTestsKeptInMemory: 0,

    setupNodeEvents(on, config) {
      return config;
    },
  },

});