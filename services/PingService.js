// PingService.js
import axios from 'axios';
import Utils from '../support/utils.js';  

/**
 * Represents a service for pinging a URL.
 */
class PingService {
  /**
   * Creates an instance of PingService.
   * @param {string} baseUrl - The base URL for the ping service.
   */
  constructor(baseUrl) {
    this.serviceUrl = `${baseUrl}/ping`;
  }

  /**
   * Checks if the ping service is available.
   * @returns {Promise<boolean>} A promise that resolves to true if the service is available, false otherwise.
   */
  async isAvailable() {
    const response = await axios.get(this.serviceUrl);

    Utils.logResponse(response);

    return response.status === 200;
  }
}

export default PingService;
