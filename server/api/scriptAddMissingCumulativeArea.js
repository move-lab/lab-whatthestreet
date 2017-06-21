var fs = require('fs');
var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;

var srcPath = "parking/rail.svg";
var srcPathOut = "parking/rail.svg";

fs.readFile(srcPath, 'utf8', function (err, svgFile) {
    if (err) throw err;

    
    var parser = new DOMParser();
    var doc = parser.parseFromString(svgFile, "image/svg+xml");
    var nbOfId = parseInt(doc.getElementsByTagName('svg')[0].lastChild.previousSibling.getAttribute('id'), 10);

    var cumulativeArea = 0;

    for (var i = 1; i <= nbOfId; i++) {
      var item = doc.getElementById(i);
      if(item) {
        console.log(i);
        // var area = parseFloat(item.getAttribute('moovel_area'));
        // cumulativeArea += area;
        // item.setAttribute("moovel_cumulative_area", Math.round(cumulativeArea * 100) / 100);
        item.setAttribute("moovel_name", "");
        item.setAttribute("moovel_neighborhood", "");
      } else {
        console.log('error with ' + i);
      }
    }

    var serializer = new XMLSerializer();

  //  Object.keys(jsonData).map((cityKey) => {
  //     var city = jsonData[cityKey];
  //     console.log(cityKey);
  //     jsonData[cityKey]["space"] = {
  //       car: city.parking.car.offStreet.area + city.moving.car.area,
  //       bike: city.parking.bike.area + city.moving.bike.area,
  //       rail: city.parking.rail.area + city.moving.rail.area
  //     }
  //   })

    fs.writeFile (srcPathOut, serializer.serializeToString(doc), function(err) {
        if (err) throw err;
        console.log('complete');
    });
});
