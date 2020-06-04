/* eslint-disable space-before-function-paren */
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');
const fetchMyIP = function (callback) {
  request('https://api.ipify.org?format=json', function (
    error,
    response,
    body
  ) {
    if (error) {
      callback(error);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    } else {
      callback(null, JSON.parse(body).ip);
    }
  });
};

const fetchCoordsByIP = function (ip, callback) {
  request(`https://ipvigilante.com/${ip}`, function (error, response, body) {
    if (error) {
      callback(error);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(msg, null);
    } else {
      const { latitude, longitude } = JSON.parse(body).data;
      callback(null, { latitude, longitude });
    }
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function (coords, callback) {
  request(
    `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`,
    function (error, response, body) {
      if (error) {
        callback(error);
      } else if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching ISS Fly Over times. Response: ${body}`;
        callback(msg, null);
      } else {
        callback(null, JSON.parse(body));
      }
    }
  );
};

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP(function (error, ip) {
    if (error) return callback(error);
    fetchCoordsByIP(ip, function (error, coords) {
      if (error) return callback(error);
      fetchISSFlyOverTimes(coords, function (error, times) {
        if (error) return callback(error);
        callback(null, times);
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};
