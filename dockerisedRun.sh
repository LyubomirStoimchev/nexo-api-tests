#!/bin/bash
docker build -t nexo-api-tests .

docker run --rm --name nexo-api-tests nexo-api-tests

docker cp nexo-api-tests:/usr/tests/reports/cucumber-report.html ./report.html

# Open the HTML report in Chrome (tested on Mac)
open -a "Google Chrome" ./report.html