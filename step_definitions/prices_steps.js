import { When, Then, setWorldConstructor, World } from "@cucumber/cucumber";
import { expect } from "chai";
import { BASE_URL } from "../config.js";
import Utils from "../support/utils.js";
import softAssert from "soft-assert";
import PricesService from "../services/PricesService.js";

const pricesService = new PricesService(BASE_URL);

/**
 * CustomWorld class extends the base World class provided by Cucumber.
 * It defines additional properties to store collected prices and initial price.
 * It's used to share state between steps in the same scenario.
 */
class CustomWorld extends World {
  prices = [];
  initialPrice = null;
}

setWorldConstructor(CustomWorld);

/**
 * Step definition for collecting prices at regular intervals.
 * Timeout is set to -1 to disable the default timeout of 5000ms.
 * @param {string} symbol - The symbol of the price to collect.
 * @param {number} wait - The interval in seconds between price collection.
 * @param {number} minutes - The duration in minutes for price collection.
 */
When(
    "I collect {string} prices every {int} seconds for {int} minutes",
    { timeout: -1 },
    async function (symbol, wait, minutes) {
        expect(symbol).to.not.be.empty;
        expect(wait).to.be.above(0);
        expect(minutes).to.be.above(0);

        const startTime = Date.now();
        const endTime = startTime + minutes * 60 * 1000;
        while (Date.now() < endTime) {
            const currentPrice = await pricesService.getPrice(symbol);
            expect(currentPrice).to.not.be.NaN;

            // TODO: Should use a logging framework
            console.log(
                `[${new Date().toLocaleTimeString()}] Current price of ${symbol}: ${currentPrice}`
            );

            if (!this.initialPrice) this.initialPrice = currentPrice;
            this.prices.push(currentPrice);

            await new Promise((resolve) => setTimeout(resolve, wait * 1000));
        }
    }
);

/**
 * Step definition for validating the average price variation.
 * @param {number} threshold - The maximum allowed percentage variation of the average price.
 */
Then(
  "verify the average price should not differ by more than {int}%",
  function (threshold) {
    expect(threshold).to.be.within(
      0,
      100,
      "Threshold % must be a number between 0 and 100!"
    );

    const avgPrice =
      this.prices.reduce((a, b) => a + parseFloat(b), 0) / this.prices.length;

    expect(Utils.getPercentDiff(avgPrice, this.initialPrice)).to.be.below(
      threshold / 100,
      `Average price: ${avgPrice}, Initial price: ${this.initialPrice}`
    );
  }
);

/**
 * Step definition for validating individual price variations.
 * @param {number} threshold - The maximum allowed percentage variation of each price.
 */
Then("verify no price should differ by more than {int}%", function (threshold) {
  expect(threshold).to.be.within(
    0,
    100,
    "Threshold % must be a number between 0 and 100!"
  );

  for (const price of this.prices) {
    softAssert.softTrue(
      Utils.getPercentDiff(parseFloat(price), this.initialPrice) < threshold / 100,
      `Failed at - Price: ${price}, Initial price: ${this.initialPrice}`
    );
  }

  softAssert.softAssertAll();
});
