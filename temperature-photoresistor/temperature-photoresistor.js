
/* 
 *  PubNub EON Demo with Arduino
 *  Displaying the data sent by Arduino with DS18B20 temperature and photoresistor sensor using Johnny-Five
 *  https://github.com/pubnub/johnnyfive-eon
 * 
 *  Tomomi Imura @girlie_mac
 *  License: MIT
 */


// Init PubNub - Please use your own keys. Get them from https://admin.pubnub.com
var pubnub = require('pubnub')({
  publish_key: 'pub-c-156a6d5f-22bd-4a13-848d-b5b4d4b36695',
  subscribe_key: 'sub-c-f762fb78-2724-11e4-a4df-02ee2ddab7fe'
});

var channel = 'temperature-photoresistor';

var temp = 0;
var light = 0;

function publish() {
  var data = { eon: {
    'temperature': temp,
    'light': light
  }};
  pubnub.publish({
    channel: channel,
    message: data,
  });
}

// Johnny-Five 
// Using a temperature sensor, type DS18B20
// This requires OneWire support using the ConfigurableFirmata

var five = require('johnny-five');

five.Board().on('ready', function() {
  var temperature = new five.Thermometer({
    controller: 'DS18B20',
    pin: 2
  });

  photoresistor = new five.Sensor({
    pin: 'A2',
    freq: 250
  });

  temperature.on('data', function() {
    console.log(this.celsius + '°C', this.fahrenheit + '°F');
    temp = this.celsius;
  });

  photoresistor.on('data', function() {
    console.log('photoresistor: ' + this.value);
    light = this.value;
  });

  setInterval(publish, 3000);
});



