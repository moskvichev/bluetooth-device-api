'use strict';

const connectBtn = document.getElementById('connectBtn');
const status = document.getElementById('status');

//function to connect to a bluetooth device

async function connectBluetoothDevice() {
  try {
    //request device
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: ['battery_service'],
    });

    //update status message

    status.textContent = `Connected to: ${device.name}`;

    //Connect to the server on the device

    const server = await device.gatt.connect();

    //Access the battery Service

    const service = await server.getPrimaryService('battery_service');
    const batteryLevel = await service.getCharacteristic('battery_level');

    //Read the battery level value

    const value = await batteryLevel.readValue();
    const batteryPercentage = value.getUint8(0);

    //display the batery percentage

    status.textContent += `  | Battery Level: ${batteryPercentage}%`;
  } catch (error) {
    status.textContent = `Error: ${error.message}`;
  }
}

connectBtn.addEventListener('click', connectBluetoothDevice);
