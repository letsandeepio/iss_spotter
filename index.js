/* eslint-disable space-before-function-paren */
// index.js
const { nextISSTimesForMyLocation } = require('./iss');

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
