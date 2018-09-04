/*Copyright 2018 Tomilola Adewale

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/ 

{
    
var space =3;
var movementAmp = 90;
var startMov = -90;
var endMov = 990;
var powersFunction =7;
var expressionString ='';


    function selected_rbutton (rbuttons)
    {
    for (var i = 0; i < rbuttons.children.length; i++)
    if (rbuttons.children[i].value == true)
    return i;
    }



function createSlider(myComp){
    
var nameTest="";
        for (t=1; t<=myComp.numLayers;t++)
        { 
            nameTest+=myComp.layer(t).name;
            }
            
            if(nameTest.indexOf("TheEase")==-1)
            {
                var mySliders= File("/Users/tomiadewale/Documents/Adobe/After Effects CC 2015/User Presets/Effects_AutonomyEases2018.ffx");
                var myComp = app.project.activeItem;
                       var myNull=myComp.layers.addNull();
                       myNull.moveToEnd();
                       myNull.name="TheEase";
                       myNull.applyPreset(mySliders);
               
               }
           
}


function myScript(thisObj) {
          function myScript_buildUI(thisObj) {
                    var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Autonomy", [0, 0, 220, 200]);


function myFocusFunction()
{if (this.text ===this.text) {this.text=""}
    }


function myBlurFunction()
{if (this.text ==="") {this.text=this.text}
    }

 

 var bt_produceScript = myPanel.add ("button", undefined, "Produce Script");

var pan1 = myPanel.add ("panel");
pan1.alignChildren = "fill";


pan1.spacing=1;











        var pan1Dictionary = pan1.add ("panel");
        var pan1Ease = pan1.add ("panel");
        var pan1Dur = pan1.add ("panel");
        var defineHoldPanel = pan1.add ("panel");
        var defineDelay = pan1.add ("panel");
        
        
pan1Dictionary.alignChildren = "fill";
pan1Ease.alignChildren = "fill";
pan1Dur.alignChildren = "fill";

var st_myDictionaryText = pan1Dictionary.add ("statictext", undefined, "Define Autonomy Path");
var et_myDictionaryText = pan1Dictionary.add ("edittext", [0,0,200,100], "[\n[0,[255,45]],\n[0,[298,90]],\n[0,[298,90]]\n\n]",{multiline: true});






var radiogroup2 = pan1Dur.add ("group"); 
radiogroup2.label = "Full Duration or Defined Duration";
var rb_fullDur = radiogroup2.add ("radiobutton", undefined, "Full Dur");
var rb_defDur = radiogroup2.add ("radiobutton", undefined, "Defined Dur");
radiogroup2.children[0].value = true;

defineHoldPanel.alignChildren = "fill";
var st_holdTime = defineHoldPanel.add ("statictext", undefined, "Define Duration of Hold Time");
var et_holdTime = defineHoldPanel.add ("edittext", undefined, ".9");
defineHoldPanel.hide();

defineDelay.alignChildren = "fill";
var st_delayTime = defineDelay.add ("statictext", undefined, "Define Delay Time");
var et_delayTime = defineDelay.add ("edittext", undefined, "0");

var st_refIndex = defineDelay.add ("statictext", undefined, "Define Reference Layer Index");
var et_refIndex = defineDelay.add ("edittext", undefined, "none");







        function showHide()
        {
            //alert("yaas");
                if (selected_rbutton(radiogroup2)==0)
                {
                    defineHoldPanel.hide()
                    }
                else
                {
                    defineHoldPanel.show()
                    }
        }

rb_fullDur.onClick = showHide;
rb_defDur.onClick = showHide;



//et_getHoldTime.addEventListener("focus", function() {if (this.text ===this.text) {this.text=""}});
et_myDictionaryText.addEventListener("blur", function() {if (this.text ==="") {this.text="[\n[0,[255,45]],\n[0,[298,90]],\n[0,[298,90]]\n\n]";}});
et_holdTime.addEventListener("blur", function() {if (this.text ==="") {this.text=".9";}});
et_refIndex.addEventListener("blur", function() {if (this.text ==="") {this.text="none";}});
et_delayTime.addEventListener("blur", function() {if (this.text ==="") {this.text="0";}});




function mainScript ()
{




var holdTime = et_holdTime.text;

if (et_delayTime.text.indexOf("Math")!=-1)
{
    var delayTime = et_delayTime.text;

}
else
{
var delayTime = '(index-1)*'+et_delayTime.text;

}


var myComp = app.project.activeItem;

    if (et_refIndex.text=="none")
    {
        var refLayer= "thisLayer";
    }
    else
    {
        var refLayer = "thisComp.layer('"+myComp.layer(parseInt(et_refIndex.text)).name+"')";
        
        }


    
var myDictionaryText =et_myDictionaryText.text;

if (selected_rbutton(radiogroup2)==0)
{
 expressionString ='//usingHoldTimes\nmyOpts =["myBounce","anticipation","normal","linear","fastToSlow","slowToFast","steps","normal2","normal3","extra1","extra2"];\nj=0;\nmarkerStart=0;\nholdTime='+holdTime+';\nd='+delayTime+';\nl='+refLayer+';\nvar myShapeArray = { startPosition: transform.position,\n    theDirections: '+myDictionaryText+'\n};\n\nfunction tomiEase(rate, startTime, endTime, startVal, endVal) {\n    original = linear(time, startTime, endTime, 0, 2);\n    myScale = rate.valueAtTime(original);\n    return linear(myScale, -2, 2, startVal - (endVal - startVal), endVal);\n}\n\nfunction myAngles(startPosition, dist, ang) {\n    r = dist;\n    towatch1 = Math.sin(degreesToRadians(ang));\n    towatch2 = Math.cos(degreesToRadians(ang));\n    startVal = startPosition;\n    endVal = startVal + [towatch2 * r, towatch1 * r];\n    return endVal;\n}\n\nfunction myCircle(startPosition, radius, freq, phase, howMuchOfCycle, start, end, motionType) {\n    freq = freq;\n    phase = phase;\n    amp = radius;\n    myTime = tomiEase(thisComp.layer("TheEase").effect(myOpts[motionType % myOpts.length])("Slider"), start, end, 0, freq / (Math.PI * 2 / howMuchOfCycle));\n    //myTime=linear(time,start,end,0,freq/(Math.PI*2/howMuchOfCycle));\n    x = amp * Math.cos(phase + (freq * myTime))\n    y = amp * Math.sin(phase + (freq * myTime))\n    return [x, y] + startPosition + [-radius * Math.cos(phase), -radius * Math.sin(phase)];\n    //How to make it always connect....the custom offset is generated based on the phase \n}\nx = myShapeArray.startPosition;\nend = l.marker.key(1 + markerStart).time + d;\nj = 0;\nendVal = 800;\nstartVal = myShapeArray.startPosition;\nendVal = myShapeArray.startPosition;\ntheNumOfMoves = myShapeArray.theDirections.length;\nmotionType = 2;\nwhile (time >= end && j < theNumOfMoves && j < l.marker.numKeys - 1 - markerStart) {\n    //inside critical while loop\n    theNumOfMoves = myShapeArray.theDirections.length;\n    //above..check the length of the dictionary item\n    seedRandom(j + 2, true);\n    randDist = random(-100, 100);\n    randAng = random(0, 360);\n    randFreq = Math.PI * 2;\n    randPhase = random(-Math.PI * 2, Math.PI * 2);\n    randHow = Math.round(random(1, 4)) * .25;\n    whichType = myShapeArray.theDirections[j][0];\n    if (myShapeArray.theDirections[j].length == 3) {\n        motionType = myShapeArray.theDirections[j][2];\n    } else {\n        motionType = 2\n    }\n    if (whichType == 0) {\n        dist = myShapeArray.theDirections[j][1][0];\n        ang = myShapeArray.theDirections[j][1][1];\n    } else if (whichType == 2) {\n        myPos = myShapeArray.theDirections[j][1][0];\n    } else {\n        radius = myShapeArray.theDirections[j][1][0];\n        freq = myShapeArray.theDirections[j][1][1];\n        phase = myShapeArray.theDirections[j][1][2];\n        howMuchOfCycle = myShapeArray.theDirections[j][1][3];\n    }\n    //the phase above is changing on every j increment\n    j++\n    start = end;\n    startVal = x;\n\n\n    if (l.marker.key(j).comment.length >0) {\n\n\n        holdTime = parseFloat(l.marker.key(j).comment);\n\n        if (whichType == 0) {\n            endVal = myAngles(startVal, dist, ang);\n            end += l.marker.key(j + 1 + markerStart).time - l.marker.key(j + markerStart).time;\n            x = tomiEase(thisComp.layer("TheEase").effect(myOpts[motionType % myOpts.length])("Slider"), start, start+holdTime, startVal, endVal);\n        } else if (whichType == 2) {\n            endVal = myPos;\n            end += l.marker.key(j + 1 + markerStart).time - l.marker.key(j + markerStart).time;\n            x = tomiEase(thisComp.layer("TheEase").effect(myOpts[motionType % myOpts.length])("Slider"), start, start + holdTime, startVal, endVal);\n        } else {\n\n            end += l.marker.key(j + 1 + markerStart).time - l.marker.key(j + markerStart).time;\n            x = myCircle(startVal, radius, freq, phase, howMuchOfCycle, start, start + holdTime, motionType);\n        }\n\n\n    } else {\n\n\n\n        if (whichType == 0) {\n            endVal = myAngles(startVal, dist, ang);\n            end += l.marker.key(j + 1 + markerStart).time - l.marker.key(j + markerStart).time;\n            x = tomiEase(thisComp.layer("TheEase").effect(myOpts[motionType % myOpts.length])("Slider"), start, end, startVal, endVal);\n        } else if (whichType == 2) {\n            endVal = myPos;\n            end += l.marker.key(j + 1 + markerStart).time - l.marker.key(j + markerStart).time;\n            x = tomiEase(thisComp.layer("TheEase").effect(myOpts[motionType % myOpts.length])("Slider"), start, end, startVal, endVal);\n        } else {\n\n            end += l.marker.key(j + 1 + markerStart).time - l.marker.key(j + markerStart).time;\n            x = myCircle(startVal, radius, freq, phase, howMuchOfCycle, start, end, motionType);\n        }\n\n\n    }\n\n\n\n\n    //refill the dictioanary below\n}\nx;'
    
    
    
 }

else
{expressionString ='//usingHoldTimes\nmyOpts =["myBounce","anticipation","normal","linear","fastToSlow","slowToFast","steps","normal2","normal3","extra1","extra2"];\nj=0;\nmarkerStart=0;\nholdTime='+holdTime+';\nd='+delayTime+';\nl='+refLayer+';\nvar myShapeArray = { startPosition: transform.position,\n    theDirections: '+myDictionaryText+'\n};\n\nfunction tomiEase(rate, startTime, endTime, startVal, endVal) {\n    original = linear(time, startTime, endTime, 0, 2);\n    myScale = rate.valueAtTime(original);\n    return linear(myScale, -2, 2, startVal - (endVal - startVal), endVal);\n}\n\nfunction myAngles(startPosition, dist, ang) {\n    r = dist;\n    towatch1 = Math.sin(degreesToRadians(ang));\n    towatch2 = Math.cos(degreesToRadians(ang));\n    startVal = startPosition;\n    endVal = startVal + [towatch2 * r, towatch1 * r];\n    return endVal;\n}\n\nfunction myCircle(startPosition, radius, freq, phase, howMuchOfCycle, start, end, motionType) {\n    freq = freq;\n    phase = phase;\n    amp = radius;\n    myTime = tomiEase(thisComp.layer("TheEase").effect(myOpts[motionType % myOpts.length])("Slider"), start, end, 0, freq / (Math.PI * 2 / howMuchOfCycle));\n    //myTime=linear(time,start,end,0,freq/(Math.PI*2/howMuchOfCycle));\n    x = amp * Math.cos(phase + (freq * myTime))\n    y = amp * Math.sin(phase + (freq * myTime))\n    return [x, y] + startPosition + [-radius * Math.cos(phase), -radius * Math.sin(phase)];\n    //How to make it always connect....the custom offset is generated based on the phase \n}\nx = myShapeArray.startPosition;\nend = l.marker.key(1 + markerStart).time + d;\nj = 0;\nendVal = 800;\nstartVal = myShapeArray.startPosition;\nendVal = myShapeArray.startPosition;\ntheNumOfMoves = myShapeArray.theDirections.length;\n\nmotionType = 2;\n\nwhile (time >= end && j < theNumOfMoves && j < l.marker.numKeys - 1 - markerStart) {\n    //inside critical while loop\n    theNumOfMoves = myShapeArray.theDirections.length;\n    //above..check the length of the dictionary item\n    seedRandom(j + 2, true);\n    randDist = random(-100, 100);\n    randAng = random(0, 360);\n    randFreq = Math.PI * 2;\n    randPhase = random(-Math.PI * 2, Math.PI * 2);\n    randHow = Math.round(random(1, 4)) * .25;\n    whichType = myShapeArray.theDirections[j][0];\n    if (myShapeArray.theDirections[j].length==3){motionType = myShapeArray.theDirections[j][2];}else{motionType = 2}\n\n    if (whichType == 0) {\n        dist = myShapeArray.theDirections[j][1][0];\n        ang = myShapeArray.theDirections[j][1][1];\n    } else if (whichType == 2) {\n        myPos = myShapeArray.theDirections[j][1][0];\n    } else {\n        radius = myShapeArray.theDirections[j][1][0];\n        freq = myShapeArray.theDirections[j][1][1];\n        phase = myShapeArray.theDirections[j][1][2];\n        howMuchOfCycle = myShapeArray.theDirections[j][1][3];\n    }\n    //the phase above is changing on every j increment\n    j++\n    start = end;\n    startVal = x;\n    if (whichType == 0) {\n        endVal = myAngles(startVal, dist, ang);\n        end += l.marker.key(j + 1 + markerStart).time - l.marker.key(j + markerStart).time;\n        x = tomiEase(thisComp.layer("TheEase").effect(myOpts[motionType % myOpts.length])("Slider"), start, start+holdTime, startVal, endVal);\n    } else if (whichType == 2) {\n        endVal = myPos;\n        end += l.marker.key(j + 1 + markerStart).time - l.marker.key(j + markerStart).time;\n        x = tomiEase(thisComp.layer("TheEase").effect(myOpts[motionType % myOpts.length])("Slider"), start, start+holdTime, startVal, endVal);\n    } else {\n        \n        end += l.marker.key(j + 1 + markerStart).time - l.marker.key(j + markerStart).time;\n        x = myCircle(startVal, radius, freq, phase, howMuchOfCycle, start, start+holdTime, motionType);\n    }\n    //refill the dictioanary below\n}\nx;'  
    


}


var myComp = app.project.activeItem;
var selectedLayers = myComp.selectedLayers;


    for (m = 0; m<selectedLayers.length; m++)
      {
            var myLayerPosition=selectedLayers[m].property("position");
            myLayerPosition.expression=expressionString;      
        }
createSlider(myComp);
    

}


bt_produceScript.onClick = mainScript




 
                    // DropDownList default selection
                    //myPanel.grp.myDropDownList.selection = 2;//Item index starts at 0
 
 
                    //Setup panel sizing and make panel resizable
                    myPanel.layout.layout(true);
                    //myPanel.pan1.minimumSize = myPanel.pan1.size;
                    myPanel.layout.resize();
                    myPanel.onResizing = myPanel.onResize = function () {this.layout.resize();}
 
                    return myPanel;
          }
 
 
          var myScriptPal = myScript_buildUI(thisObj);
 
 
          if ((myScriptPal != null) && (myScriptPal instanceof Window)) {
                    myScriptPal.center();
                    myScriptPal.show();
                    }
          }

          myScript(this);
}
 
