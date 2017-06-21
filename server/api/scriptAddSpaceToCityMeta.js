var fs = require('fs');

var srcPath = "cityMeta.json";

fs.readFile(srcPath, 'utf8', function (err, cityMetaData) {
    if (err) throw err;

    let jsonData = JSON.parse(cityMetaData);

   Object.keys(jsonData).map((cityKey) => {
      var city = jsonData[cityKey];
      console.log(cityKey);
      jsonData[cityKey]["space"] = {
        car: city.parking.car.offStreet.area + city.moving.car.area,
        bike: city.parking.bike.area + city.moving.bike.area,
        rail: city.parking.rail.area + city.moving.rail.area
      }
    })

    fs.writeFile (srcPath, JSON.stringify(jsonData, null, 2), function(err) {
        if (err) throw err;
        console.log('complete');
    });
});
