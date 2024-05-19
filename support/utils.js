export default class Utils {
  /**
   * Calculates the percentage difference between two numbers.
   * !Important: The function handles both positive and negative values using Math.abs().
   * @param {number} oldValue - The old value.
   * @param {number} newValue - The new value.
   * @returns {number} The percentage difference.
   */
  static getPercentDiff = (someValue, otherValue) => {
    return Math.abs((someValue - otherValue) / otherValue);
  };

  /**
   * Logs a response.
   *
   * @param {Object} response - The response object.
   */
  static logResponse = (response) => {
    const simplifiedResponse = {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };

    // TODO: Should use a logging framework
    console.log(JSON.stringify(simplifiedResponse, null, 2));
  };
}
