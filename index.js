const { fetchMyIP,  fetchCoordsByIP, fetchISSFlyOverTimes} = require('./iss');

/* fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  // console.log(typeof ip);
  console.log('It worked! Returned IP:' , ip);
}); */

/* fetchCoordsByIP((error, data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log(`It worked! latitude ${data.latitude} longitude ${data.longitude} `);
}); */

/* const coords = { LAT: 43.63830, LON: -79.43010 };
fetchISSFlyOverTimes(
  coords,
  (error, data) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
    console.log(`It worked? Array of flyover times:`);
    console.log(data)
}) */

const nextISSTimesForMyLocation = () => {
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  // console.log(ip)
  fetchCoordsByIP((error, data) => {
    const coordinates = data;
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
    // console.log(coordinates);
    fetchISSFlyOverTimes(
      coordinates,
      (error, data) => {
        // console.log(err, data)
        if (error) {
          console.log("It didn't work!" , error);
          return;
        }
        console.log(data)
        data.forEach( el => {

          const date = new Date(el.risetime);
          const datetime = date.toDateString();
          console.log(
            `Next pass at ${datetime} for ${el.duration} seconds!`
          );
        })
    })
  });
});
}
nextISSTimesForMyLocation()

