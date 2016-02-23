/* 
 *  PubNub EON Demo with Arduino
 *  Displaying the data sent by potntiometer using Johnny-Five
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

var channel = 'potentiometer';

var five = require('johnny-five'),
  board, potentiometer;

board = new five.Board();

board.on('ready', function() {
  potentiometer = new five.Sensor({
    pin: 'A0',
    freq: 250
  });

  potentiometer.on('data', function() {
    // value range 0 - 1023
    console.log(this.value, this.raw);

    var data = { eon: {
      'potentiometer': this.value
    }};
    pubnub.publish({
      channel: channel,
      message: data,
    });
  });
});