/* eslint-disable space-before-function-paren */
// index.js
const { nextISSTimesForMyLocation } = require('./iss_promised.js');

const printPassTimes = (passTimes) => {
  for (const res of passTimes.response) {
    console.log(
      `Next pass at ${new Date(res['risetime'] * 1000)} for ${
        res.duration
      } seconds!`
    );
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
