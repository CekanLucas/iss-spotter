const {nextISSTimesForMyLocation} = require('./iss_promised');

nextISSTimesForMyLocation()
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });