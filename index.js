/* eslint-disable space-before-function-paren */
// index.js
const { nextISSTimesForMyLocation } = require('./iss');

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  for (const res of passTimes.response) {
    console.log(
      `Next pass at ${new Date(res['risetime'] * 1000)} for ${
        res.duration
      } seconds!`
    );
  }
});
