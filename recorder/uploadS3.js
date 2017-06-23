var AWS = require('aws-sdk'),
    fs = require('fs');

const myConfig = new AWS.Config(); 
myConfig.update({ accessKeyId: '', secretAccessKey: '' });

var s3 = new AWS.S3(myConfig);

fs.readFile("berlin_car_14.mp4", function (err, data) {
    if (err) { 
        console.log('fs error'+ err);
    } else {
        var putParams = {
            Bucket: "whatthestreet-tdurand",
            Key: "berlin_car_14.mp4",
            Body: data,
            ContentType: 'video/mp4'
        };

        s3.putObject(putParams, function(err, data) {
            if (err) { 
                console.log('Error putting object on S3: ', err); 
            } else { 
                console.log('Placed object on S3: ', data); 
            }  
        });
    }
});
