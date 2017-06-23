var AWS = require('aws-sdk');
var RECORDER_CONF = require('./RECORDER_CONF'); 

debugger;

const myConfig = new AWS.Config(); 
myConfig.update({ 
    accessKeyId: RECORDER_CONF.AWS_ACCESS_KEY_ID,
    secretAccessKey: RECORDER_CONF.AWS_SECRET_ACCESS_KEY
});

var s3 = new AWS.S3(myConfig);

exports.isFileAlreadyInS3 = function(pathS3, callbackDoNotExists, callbackExists) {

  var params = {
    Bucket: RECORDER_CONF.AWS_BUCKET_NAME,
    Key: pathS3
  };
  
  s3.headObject(params, function (err, metadata) {  
    if (err && err.code === 'NotFound') {  
      callbackDoNotExists()
    } else {  
      // s3.getSignedUrl('getObject', params, callback); 
      callbackExists(); 
    }
  });

}
