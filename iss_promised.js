/* -- fetchMyIP ---
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
/* -- fetchCoordsByIP --
 * Makes a request to ipvigilante.com using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
/** -- fetchISSFlyOverTimes --
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

const request = require('request-promise-native');

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(printTimes);
  // .then(data => console.log(JSON.parse(data).response));
};
  
const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`);
};

const fetchISSFlyOverTimes = function(data) {

  const coord = JSON.parse(data).data;
  const LAT = coord.latitude;
  const LON = coord.longitude;
  // console.log(LAT,LON, 'huh') //works
        
  return request(`http://api.open-notify.org/iss-pass.json?lat=${LAT}&lon=${LON}`);
};

const printTimes = data => {
  const arr = JSON.parse(data).response;
  arr.forEach(el => {
    const date = new Date(el.risetime);
    const datetime = date.toDateString();
    console.log(
      `Next pass at ${datetime} for ${el.duration} seconds!`
    );
  });
};


module.exports = {
  nextISSTimesForMyLocation
};