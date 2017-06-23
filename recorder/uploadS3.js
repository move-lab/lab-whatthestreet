var AWS = require('aws-sdk');
var fs = require('fs');
var RECORDER_CONF = require('./RECORDER_CONF'); 

/* 
    USAGE: node uploadS3 PATH_LOCAL_MP4 PATH_S3_BUCKET
*/

// Parse args
var PATH_LOCAL_MP4 = process.argv[2]; 
var PATH_S3_BUCKET = process.argv[3];

const myConfig = new AWS.Config(); 
myConfig.update({ 
    accessKeyId: RECORDER_CONF.AWS_ACCESS_KEY_ID,
    secretAccessKey: RECORDER_CONF.AWS_SECRET_ACCESS_KEY
});

var s3 = new AWS.S3(myConfig);

fs.readFile(PATH_LOCAL_MP4, function (err, data) {
    if (err) { 
        console.log('fs error'+ err);
    } else {
        var putParams = {
            Bucket: RECORDER_CONF.AWS_BUCKET_NAME,
            Key: PATH_S3_BUCKET,
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
