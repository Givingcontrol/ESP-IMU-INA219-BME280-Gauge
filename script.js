// Get current sensor readings when the page loads  
window.addEventListener('load', getReadings);

var animationDurationms = 50;

// Create Temperature Gauge
var gaugeTemp = new LinearGauge({
  renderTo: 'gauge-temperature',
  width: 120,
  height: 400,
  units: "Temperature C",
  minValue: 0,
  startAngle: 90,
  ticksAngle: 180,
  maxValue: 40,
  colorValueBoxRect: "#049faa",
  colorValueBoxRectEnd: "#049faa",
  colorValueBoxBackground: "#f1fbfc",
  valueDec: 2,
  valueInt: 2,
  majorTicks: [
      "0",
      "5",
      "10",
      "15",
      "20",
      "25",
      "30",
      "35",
      "40"
  ],
  minorTicks: 4,
  strokeTicks: true,
  highlights: [
      {
          "from": 30,
          "to": 40,
          "color": "rgba(200, 50, 50, .75)"
      }
  ],
  colorPlate: "#fff",
  colorBarProgress: "#CC2936",
  colorBarProgressEnd: "#049faa",
  borderShadowWidth: 0,
  borders: false,
  needleType: "arrow",
  needleWidth: 2,
  needleCircleSize: 7,
  needleCircleOuter: true,
  needleCircleInner: false,
  animationDuration: animationDurationms,  //1500
  animationRule: "linear",
  barWidth: 10,
}).draw();

// Create Pressure Gauge
var gaugePress = new RadialGauge({
    renderTo: 'gauge-pressure',
    width: 200,
    height: 200,
    units: "pressure (pa)",
    minValue: 101000,
    maxValue: 102000,
    colorValueBoxRect: "#049faa",
    colorValueBoxRectEnd: "#049faa",
    colorValueBoxBackground: "#f1fbfc",
    valueInt: 2,
    majorTicks: [
        "101200",
        "101225",
        "101250",
        "101275",
        "101300"
  
    ],
    minorTicks: 4,
    strokeTicks: true,
    highlights: [
        {
            "from": 101200,
            "to": 101400,
            "color": "#03C0C1"
        }
    ],
    colorPlate: "#fff",
    borderShadowWidth: 0,
    borders: false,
    needleType: "line",
    colorNeedle: "#007F80",
    colorNeedleEnd: "#007F80",
    needleWidth: 2,
    needleCircleSize: 3,
    colorNeedleCircleOuter: "#007F80",
    needleCircleOuter: true,
    needleCircleInner: false,
    animationDuration: animationDurationms,  //1500
    animationRule: "linear"
  }).draw();

// Create Voltmeter Gauge
var gaugeVoltmeter = new RadialGauge({
    renderTo: 'gauge-voltmeter',
    width: 200,
    height: 200,
    units: "V",
    minValue: -5,
    maxValue: 30,
    colorValueBoxRect: "#049faa",
    colorValueBoxRectEnd: "#049faa",
    colorValueBoxBackground: "#f1fbfc",
    valueInt: 2,
    majorTicks: [
        "-5",
        "0",
        "5",
        "10",
        "15",
        "20",
        "25",
        "30"
  
    ],
    minorTicks: 4,
    strokeTicks: true,
    highlights: [
        {
            "from": 25,
            "to": 30,
            "color": "#03C0C1"
        }
    ],
    colorPlate: "#fff",
    borderShadowWidth: 0,
    borders: false,
    needleType: "line",
    colorNeedle: "#007F80",
    colorNeedleEnd: "#007F80",
    needleWidth: 2,
    needleCircleSize: 3,
    colorNeedleCircleOuter: "#007F80",
    needleCircleOuter: true,
    needleCircleInner: false,
    animationDuration: animationDurationms,  //1500
    animationRule: "linear"
  }).draw();
  
// Create X Gauge
var gaugeXyz = new RadialGauge({
  renderTo: 'gauge-X',
  width: 200,
  height: 200,
  units: "g",
  minValue: -20,
  maxValue: 20,
  colorValueBoxRect: "#049faa",
  colorValueBoxRectEnd: "#049faa",
  colorValueBoxBackground: "#f1fbfc",
  valueInt: 2,
  majorTicks: [
      "-20",
      "-10",
      "-0",
      "10",
      "20"

  ],
  minorTicks: 4,
  strokeTicks: true,
  highlights: [
      {
          "from": 0,
          "to": 1,
          "color": "#03C0C1"
      }
  ],
  colorPlate: "#fff",
  borderShadowWidth: 0,
  borders: false,
  needleType: "line",
  colorNeedle: "#007F80",
  colorNeedleEnd: "#007F80",
  needleWidth: 2,
  needleCircleSize: 3,
  colorNeedleCircleOuter: "#007F80",
  needleCircleOuter: true,
  needleCircleInner: false,
  animationDuration: animationDurationms,  //1500
  animationRule: "linear"
}).draw();

// Create Y Gauge
var gaugexYz = new RadialGauge({
  renderTo: 'gauge-Y',
  width: 200,
  height: 200,
  units: "g",
  minValue: -20,
  maxValue: 20,
  colorValueBoxRect: "#049faa",
  colorValueBoxRectEnd: "#049faa",
  colorValueBoxBackground: "#f1fbfc",
  valueInt: 2,
  majorTicks: [
      "-20",
      "-10",
      "-0",
      "10",
      "20"

  ],
  minorTicks: 4,
  strokeTicks: true,
  highlights: [
      {
          "from": 0,
          "to": 1,
          "color": "#03C0C1"
      }
  ],
  colorPlate: "#fff",
  borderShadowWidth: 0,
  borders: false,
  needleType: "line",
  colorNeedle: "#007F80",
  colorNeedleEnd: "#007F80",
  needleWidth: 2,
  needleCircleSize: 3,
  colorNeedleCircleOuter: "#007F80",
  needleCircleOuter: true,
  needleCircleInner: false,
  animationDuration: animationDurationms,  //1500
  animationRule: "linear"
}).draw();

// Create Z Gauge
var gaugexyZ = new RadialGauge({
  renderTo: 'gauge-Z',
  width: 200,
  height: 200,
  units: "g",
  minValue: -20,
  maxValue: 20,
  colorValueBoxRect: "#049faa",
  colorValueBoxRectEnd: "#049faa",
  colorValueBoxBackground: "#f1fbfc",
  valueInt: 2,
  majorTicks: [
      "-20",
      "0",
      "20"

  ],
  minorTicks: 4,
  strokeTicks: true,
  highlights: [
      {
          "from": 0,
          "to": 10,
          "color": "#03C0C1"
      }
  ],
  colorPlate: "#fff",
  borderShadowWidth: 0,
  borders: false,
  needleType: "line",
  colorNeedle: "#007F80",
  colorNeedleEnd: "#007F80",
  needleWidth: 2,
  needleCircleSize: 3,
  colorNeedleCircleOuter: "#007F80",
  needleCircleOuter: true,
  needleCircleInner: false,
  animationDuration: animationDurationms,  //1500
  animationRule: "linear"
}).draw();

// Create Sum Gauge
var gaugeSumxyz = new RadialGauge({
  renderTo: 'gauge-Sum',
  width: 200,
  height: 200,
  units: "g",
  minValue: 0,
  maxValue: 50,
  colorValueBoxRect: "#049faa",
  colorValueBoxRectEnd: "#049faa",
  colorValueBoxBackground: "#f1fbfc",
  valueInt: 2,
  majorTicks: [
      "-0",
      "10",
      "20",
      "30",
      "40",
      "50"

  ],
  minorTicks: 4,
  strokeTicks: true,
  highlights: [
      {
          "from": 0,
          "to": 1,
          "color": "#03C0C1"
      }
  ],
  colorPlate: "#fff",
  borderShadowWidth: 0,
  borders: false,
  needleType: "line",
  colorNeedle: "#007F80",
  colorNeedleEnd: "#007F80",
  needleWidth: 2,
  needleCircleSize: 3,
  colorNeedleCircleOuter: "#007F80",
  needleCircleOuter: true,
  needleCircleInner: false,
  animationDuration: animationDurationms,  //1500
  animationRule: "linear"
}).draw();

// Create LinearSum Gauge
var gaugeLinearSumxyz = new LinearGauge({
  renderTo: 'gauge-LinearSum',
  width: 120,
  height: 400,
  units: "Sum g",
  minValue: 0,
  startAngle: 90,
  ticksAngle: 180,
  maxValue: 50,
  barBeginCircle: 0,
  colorValueBoxRect: "#049faa",
  colorValueBoxRectEnd: "#049faa",
  colorValueBoxBackground: "#f1fbfc",
  valueDec: 2,
  valueInt: 2,
  majorTicks: [
      "0",
      "5",
      "10",
      "15",
      "20",
      "25",
      "30",
      "35",
      "40",
      "45",
      "50"
  ],
  minorTicks: 4,
  strokeTicks: true,
  highlights: [
      {
          "from": 30,
          "to": 40,
          "color": "rgba(200, 50, 50, .75)"
      }
  ],
  colorPlate: "#fff",
  colorBarProgress: "#CC2936",
  colorBarProgressEnd: "#049faa",
  borderShadowWidth: 0,
  borders: false,
  needleType: "arrow",
  needleWidth: 2,
  needleCircleSize: 7,
  needleCircleOuter: true,
  needleCircleInner: false,
  animationDuration: animationDurationms,  //1500
  animationRule: "linear",
  barWidth: 10,
}).draw();

// Function to get current readings on the webpage when it loads for the first time
function getReadings(){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      console.log(myObj);
      var temp = myObj.temperature;
      var press = myObj.pressure;
      gaugeTemp.value = temp;
      gaugePress.value = press;
    }
  }; 
  xhr.open("GET", "/readings", true);
  xhr.send();
}

if (!!window.EventSource) {
  var source = new EventSource('/events');
  
  source.addEventListener('open', function(e) {
    console.log("Events Connected");
  }, false);

  source.addEventListener('error', function(e) {
    if (e.target.readyState != EventSource.OPEN) {
      console.log("Events Disconnected");
    }
  }, false);
  
  source.addEventListener('message', function(e) {
    console.log("message", e.data);
  }, false);
  
  source.addEventListener('new_readings', function(e) {
    console.log("new_readings", e.data);
    var myObj = JSON.parse(e.data);
    console.log(myObj);
    gaugeTemp.value = myObj.temperature;
    gaugePress.value = myObj.pressure;
  }, false);

  source.addEventListener('gyro_readings', function(e) {
    console.log("gyro_readings", e.data);
    var obj = JSON.parse(e.data);
    //document.getElementById("gyroX").innerHTML = obj.gyroX;
   // document.getElementById("gyroY").innerHTML = obj.gyroY;
   // document.getElementById("gyroZ").innerHTML = obj.gyroZ;

     }, false);

  source.addEventListener('temperature_reading', function(e) {
    console.log("temperature_reading", e.data);
    //document.getElementById("temp").innerHTML = e.data;
  }, false);

  source.addEventListener('accelerometer_readings', function(e) {
    console.log("accelerometer_readings", e.data);
    var obj = JSON.parse(e.data);
    gaugeXyz.value = obj.accX;
    gaugexYz.value = obj.accY;
    gaugexyZ.value = obj.accZ;
    gaugeSumxyz.value = obj.Sumaccel;
    gaugeLinearSumxyz.value = obj.Sumaccel;
   //document.getElementById("accX").innerHTML = obj.accX;
   // document.getElementById("accY").innerHTML = obj.accY;
   // document.getElementById("accZ").innerHTML = obj.accZ;
   // document.getElementById("Sumaccel").innerHTML = obj.Sumaccel;
   // lineSumAccel =  obj.Sumaccel;
  }, false);

  source.addEventListener('voltmeter_reading', function(e) {
    console.log("voltmeter_reading", e.data);
    var obj = JSON.parse(e.data);
    gaugeVoltmeter.value = obj.busvoltage;
    //document.getElementById("temp").innerHTML = e.data;
  }, false);

}