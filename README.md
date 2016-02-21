# EON Demo from sensor data using Arduino and Johnny-Five

You need to install *Johnny-Five* and *PubNub* to run the node.js code with Arduino.

```bash
$ npm install johnny-five
```

```bash
$ npm install pubnub
```

## Temperature

Plotting a spline graph from a temperature data.

The temperature data comes from a [DS18B20](http://www.maximintegrated.com/en/products/analog/sensors-and-sensor-interface/DS18S20.html) sensor, and it is published to PubNub.

When you are using Arduino with Johnny-Five, you need to install **ConfigurableFirmata** to your Arduino to be able to run the code. The code requires OneWire support using the ConfigurableFirmata.

### Installing ConfigurableFirmata

1. Connect your Arduino to computer with a USB cable
2. On Arduino IDE, go to **Sketch** > **Include Library** > **Manage Libraries**
3. Search for "ConfigurableFirmata"
4. Click the result, then click **Install**
5. Go to **File** > **Examples** > **ConfigurableFirmata**
6. Upload the code to the device

Then run *temperature.js*:

```bash
$ node temperature.js
```