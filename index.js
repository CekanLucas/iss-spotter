const { fetchMyIP,  fetchCoordsByIP, fetchISSFlyOverTimes} = require('./iss');

const nextISSTimesForMyLocation = () => {
  fetchMyIP((error) => {
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
          console.log(data);
          data.forEach(el => {

            const date = new Date(el.risetime * 1000); // seconds to milliseconds
            const datetime = date.toLocaleString();
            console.log(
              `Next pass at ${datetime} for ${el.duration} seconds!`
            );
          });
        });
    });
  });
};
nextISSTimesForMyLocation();

