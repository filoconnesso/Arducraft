// Author: Mirko Pacioni
// Description: This Arduino sketch utilizes the Arducraft library to establish communication
// with Minecraft through the serial port. The code continuously reads messages from the
// Minecraft chat and responds to specific commands. If the received message contains "ledon",
// it turns on the built-in LED. Conversely, if the message contains "ledoff", it turns off
// the LED. This integration allows users to control the Arduino board's hardware by sending
// simple commands from within the Minecraft game, showcasing an interactive interaction
// between the virtual world and the physical environment.

// Include the Arducraft library
#include <Arducraft.h>

// Create an instance of Arducraft
Arducraft mc;

// Variable to store messages from the Minecraft chat
String minecraftChat;

// Initialization function
void setup() {
  // Begin serial communication at 115200 bps
  Serial.begin(115200);

  // Initialize Arducraft with the serial port
  mc.begin(&Serial);

  // Set the OUTPUT mode for the LED_BUILTIN pin
  pinMode(LED_BUILTIN, OUTPUT);
}

// Main loop function
void loop() {
  // Execute the Arducraft loop to handle communication with Minecraft
  mc.run();  
  
  // Read the message from the Minecraft chat
  minecraftChat = mc.readMessage();

  // Check if the message contains "ledon"
  if(minecraftChat.indexOf("ledon") > -1) {
    // Turn on the LED
    digitalWrite(LED_BUILTIN, HIGH);
  }

  // Check if the message contains "ledoff"
  if(minecraftChat.indexOf("ledoff") > -1) {
    // Turn off the LED
    digitalWrite(LED_BUILTIN, LOW);
  }
}
