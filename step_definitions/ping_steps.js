import { Given } from "@cucumber/cucumber";
import { expect } from "chai";
import { BASE_URL } from "../config.js";
import PingService from "../services/PingService.js";

// Can be injected into the Global World like POMs in the UI tests project
const pingService = new PingService(BASE_URL);

/**
 * Step definition for service availability.
 * @async
 * @function
 */
Given("Prices service is available", async function () {
  expect(await pingService.isAvailable()).to.be.true;
});
