var page = require("webpage").create();

window.console.log = function(msg) { alert(msg) }; 

// Page dimensions
var url = "http://localhost:4000/berlin/mapmobile/car/lanes/18?bike=0.34&rail=0.32&car=0.33", // URL of your page
    duration = 2000,
    numFrames = 50,
    currentFrame = 0;

page.open(url,function(status) {

  // Update page dimensions
  page.viewportSize = { width: 512, height: 512 };

  // Wait for page to be loaded
  page.evaluate(function() {
    // document.addEventListener('MapLoaded', function() {
    //     console.log('MapLoaded');
    //     //  page.evaluate(function(){ ready(); });
    // }, false);
    window.console.log("Added listener to wait for page ready");
    // phantom.exit();
  });
 

  function getFrame() {
    page.render("/dev/stdout", { format: "png" });

    if (currentFrame > numFrames) {
      return phantom.exit();
    }

    // Get a new frame every ___ milliseconds
    setTimeout(getFrame,duration/numFrames);

  }

});
