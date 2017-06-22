var page = require("webpage").create();

page.viewportSize = { width: 512, height: 512 };

page.onCallback = function(event){
    if(event.type === "readyToAnimate") {
      console.log('Ready To animate, start it, animation duration will be:');
      console.log(event.animationDuration);
      page.render('test.png', { format: "png" });
      phantom.exit();
    }
};

page.open("http://localhost:4000/berlin/mapmobile/car/lanes/1645?bike=0.34&rail=0.32&car=0.33");
