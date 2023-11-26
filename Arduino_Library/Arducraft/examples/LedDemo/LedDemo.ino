#include <Arducraft.h>
#include <Tweakly.h>

Pad button(11, INPUT_PULLUP);

Arducraft mc;

String minecraftChat;

bool close = false;
unsigned long pressed_old_time;

void setup() {

  Serial.begin(115200);
  mc.begin(&Serial);

  pinMode(LED_BUILTIN, OUTPUT);

  button.onEvent(CLICK, [] {
    close = !close;
    if (close) {
      mc.addTagToEntity("gateclosed", "mirkopac");
    }
    if (!close) {
      mc.removeTagToEntity("gateclosed", "mirkopac");
    }
  });
}

void loop() {
  TweaklyRun();
  mc.run();

  minecraftChat = mc.readMessage();

  if (minecraftChat.indexOf("ledon") > -1) {
    digitalWrite(LED_BUILTIN, HIGH);
    if (digitalRead(LED_BUILTIN) == HIGH) {
      mc.writeMessage("led is on");
    }
  }

  if (minecraftChat.indexOf("ledoff") > -1) {
    digitalWrite(LED_BUILTIN, LOW);
    if (digitalRead(LED_BUILTIN) == LOW) {
      mc.writeMessage("led is off");
    }
  }
}
