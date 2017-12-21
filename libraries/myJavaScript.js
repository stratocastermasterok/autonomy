function init() {

  var fps = 30;
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  var duration = 10; // seconds
  var start = null;





//MY COOL CODE

   function chordSway(timestamp){
    //console.log("triggered");
      var progress, x, y, y2,startX;
      if (start === null) start = timestamp;

      progressInSeconds = (timestamp - start) / 1000; // percent

        startX=0;
        space=5.5;
        movementAmp=0;


        t=progressInSeconds;
        turningPoint =1.667;
        h=0;


        if ( t <= turningPoint)
        {
        x=t-2;
        h=90*Math.pow(x, 7)+startX+(t* movementAmp);
        }

        else if ( t > turningPoint && t < turningPoint +space)
        {
        h=0+startX+(t* movementAmp);
        }

        else if ( t >= turningPoint)
        {
        h=0+startX+(t* movementAmp);

        }

        if (h>1600 || h<-300)
        {h=1600}


      x = h; // x = ƒ(t)
      var myChordLocation = document.getElementById("myChordLocation");

      myChordLocation.innerHTML="changed It UP";
      requestAnimationFrame(chordSway);
    }
                requestAnimationFrame(chordSway);





}


init();
