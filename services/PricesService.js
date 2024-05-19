// PricesService.js
import axios from "axios";
import Utils from '../support/utils.js';

/**
 * Represents a service for retrieving prices.
 */
class PricesService {
  constructor(baseUrl) {
    this.serviceUrl = `${baseUrl}/ticker/price`;
  }

  /**
   * Retrieves the price for a given symbol.
   *
   * @param {string} symbol - The symbol for which to retrieve the price.
   * @returns {number} The price of the symbol.
   */
  async getPrice(symbol) {
    const response = await axios.get(this.serviceUrl, { params: { symbol } });

    Utils.logResponse(response);

    return response.data.price;
  }
}

export default PricesService;
