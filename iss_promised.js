/* eslint-disable space-before-function-paren */
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request-promise-native');

const fetchMyIP = function () {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function (ip) {
  const IP = JSON.parse(ip).ip;
  return request(`https://ipvigilante.com/${IP}`);
};

const fetchISSFlyOverTimes = function (result) {
  const { latitude, longitude } = JSON.parse(result).data;
  return request(
    `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`
  );
};

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => JSON.parse(data));
};

module.exports = {
  nextISSTimesForMyLocation
};
