Feature: Volatility Monitoring

  # Symbols (like BTCUSDT) can be seen in the Binance API documentation
  Scenario Outline: Monitor BTC-USD prices for <interval> minutes
    Given Prices service is available
    When I collect "BTCUSDT" prices every 10 seconds for <interval> minutes
    Then verify the average price should not differ by more than 1%
    And verify no price should differ by more than 2%

    Examples:
      | interval |
      |        1 |
      |        3 |
      |        5 |
