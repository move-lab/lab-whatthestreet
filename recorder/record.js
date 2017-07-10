var page = require("webpage").create();
var args = require('system').args;

// Parse args
var CITY = args[1] || "berlin";
var MOBILITY_TYPE = args[2] || "car";
var STREET_ID = args[3] || "1645";
var TIMEOUT = 10000

var PATH_TO_FILE_FOLDER = "data/" + CITY + "/" + MOBILITY_TYPE;
var PATH_TO_FILE_TEMP_FRAME = PATH_TO_FILE_FOLDER + "/frames_street_" + STREET_ID;

page.viewportSize = { width: 512, height: 512 };

// Slow down the animation by 3x, since phantom can't render more than 10 fps
// while outputting the frames
var SLOW_DOWN_FACTOR = 3;
var animationDuration = 0;
var currentFrame = 0;
var stop = false;
var TARGET_FPS = 30;
var getFrameEvery = (1000 / TARGET_FPS) * SLOW_DOWN_FACTOR;
var readyToAnimateFired = false;

function getFrame() {
  page.render(PATH_TO_FILE_TEMP_FRAME +"/frame_"+ currentFrame + ".png", { format: "png" });
  console.log("rendering frame nº" + currentFrame);
  if (stop) {
    phantom.exit();
  }
  currentFrame++;
  
  // Get a new frame every ___ milliseconds
  setTimeout(getFrame, getFrameEvery);
}

page.onCallback = function(event){
    if(event.type === "readyToAnimate") {
      readyToAnimateFired = true;
      console.log(SLOW_DOWN_FACTOR);
      console.log('Ready To animate, start it, animation duration will be:');
      animationDuration = event.animationDuration * SLOW_DOWN_FACTOR;
      console.log(animationDuration);

      // Start the animation
      page.evaluate(function(slowDownFactor){
          // Trigger start animation
          window.renderAnimation(slowDownFactor);
      }, SLOW_DOWN_FACTOR);
      getFrame();

      // Stop getting Frame after animation finished
      setTimeout(function() {
        stop = true;
      }, animationDuration);
    }
};

page.open("https://whatthestreet.moovellab.com/" + CITY + "/mapmobile/" + MOBILITY_TYPE + "/lanes/" + STREET_ID + "?bike=0.34&rail=0.32&car=0.33", function(status) {
  if (status !== "success") {
    console.log("Unable to access https://whatthestreet.moovellab.com/" + CITY + "/mapmobile/" + MOBILITY_TYPE + "/lanes/" + STREET_ID + "?bike=0.34&rail=0.32&car=0.33");
    phantom.exit();
  } else {
    //Hard timeout if readyToAnimate now fired in 10s
    // Can happen for street that does not render
    setTimeout(function() {
      if(!readyToAnimateFired) {
        console.log("Animation does not start, hard timeout stop");
        phantom.exit();
      }
    }, TIMEOUT);
  }
});
