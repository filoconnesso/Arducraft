//----------------------------------------------------------------------------//
/*
 *  Copyright (C) 2021  Filo Connesso - filoconnesso.it
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 */
//----------------------------------------------------------------------------//

/*
 * FILO CONNESSO ARDUCRAFT LIBRARY
 *
 *
 * Created by Alessandro Marcon (@alessandromrc) and Mirko Pacioni
 * November 2th 2021
 *
 */

#ifndef Arducraft_H
#define Arducraft_H

// include Arduiono.h
#include "Arduino.h"

// define for game elements
#include "definitions/aliases.h"
#include "definitions/blocks.h"
#include "definitions/entities.h"
#include "definitions/game_modes.h"
#include "definitions/weather.h"
#include "definitions/colors.h"

// version
#define VERSION "1.0.0"

// compilation informations
const char file_name[] = __FILE__;
const char compile_date[] = __DATE__;
const char compile_time[] = __TIME__;

class Arducraft {
private:
  // strings for status
  // spawn
  String spawnValue;
  // kick
  String kickedValue;
  // end
  String endValue;
  // death
  String deathValue;
  // health
  String healthValue;
  // error
  String errorValue;
  // raining
  String rainingValue;
  // moving
  String botMovingValue;
  // variable that contains the latest data from the code
  String lastBotDatas = "";
  // variable that holds the last message from the code chat
  String lastMessage = "";
  // variable for write message lock
  String oldWriteMessage = "";
  // temporary bot states, by default they are set to false
  bool spawn, kicked, end, death, health, error = false;
  // variable that contains the latest error message from the game
  String errorMessage = "";
  // variable that contains the current time of the game
  unsigned long worldTime = 0;
  // variables that contain the bot's vital values
  int botExperience, botHealth, botFood, botOxygen = 0;
  // variable that contains the game mode of the bot
  String botGameMode = "";
  // variable that contains the current state of the weather, if it goes to true it is raining or there is a storm in progress
  bool raining = false;
  // variable that contains the response time from the game
  int pingValue;
  // function that allows you to split variables of type String by indicating a separator
  String splitString(String string, char separator, int index) {
    int found = 0;
    int strIndex[] = {0, -1};
    int maxIndex = string.length() - 1;
    for (int i = 0; i <= maxIndex && found <= index; i++) {
      if (string.charAt(i) == separator || i == maxIndex) {
        found++;
        strIndex[0] = strIndex[1] + 1;
        strIndex[1] = (i == maxIndex) ? i + 1 : i;
      }
    }
    return found > index ? string.substring(strIndex[0], strIndex[1]) : "";
  }
  // variable that goes to true if the bot is moving
  bool botMoving = false;
  // Stream object that will be assigned to the reference serial for communication with the game
  Stream *serial;
  // variables that contain the location of the bot
  float botPositionX, botPositionY, botPositionZ = 0;
  //serial output message
  void output(String message);
public:
  // constructor for the Arducraft class
  Arducraft() { 
      //
  }
  // function that allows you to connect the serial of the bot
  void begin(Stream *newserial);
  // function that reads the last message sent in the game chat
  String readMessage();
  // function that writes a message in chat
  void writeMessage(String message);
  // function that allows you to set the time of the gic
  void setWorldTime(int value);
  // function that allows you to add ticks to the time of the game
  void addWorldTime(int value);
  // function that allows you to set the weather conditions
  void setWeather(int weather_value);
  // function that allows you to teleport the bot to a desired point
  void teleportBotToPosition(float x, float y, float z);
  // function that allows you to teleport an entity to a desired position
  void teleportEntityToPosition(String entity, float x, float y, float z);
  // function that allows you to teleport the bot to the position of a specific entity
  void teleportBotToEntity(String entity);
  // function that allows you to teleport an entity to the position of another entity
  void teleportEntityToEntity(String f_entity, String s_entity);
  // function that allows you to set the game mode to a specific entity
  void setGameMode(String entity, int mode_value);
  // function that allows to produce an entity in the current position of the bot
  void spawnEntity(String entity);
  // function that tracks library functionality and controls the game
  void run();
  // function that allows you to extract the current time of the game
  int getWorldTime();
  // function that allows you to extract the latest error message from the game
  String getErrorMessage();
  // function that goes to true if the bot is presented on the map
  bool botIsSpawned();
  // function that goes to true if the bot has received a kick
  bool botIsKicked();
  // function that goes to true if the bot is closed
  bool botIsEnded();
  // function that goes to true if the bot dies
  bool botIsDead();
  // function that goes true if the bot detects a change in its health status
  bool botHealthIsChanged();
  // function that goes to true if the bot produces an error
  bool botErrorOccurred();
  // function that fetches the bot's experience level
  int getBotExperienceLevel();
  // function that fetches the bot's health level
  int getBotHealthLevel();
  // function that fetches the hunger level of the bot
  int getBotHungerLevel();
  // function that takes the oxygen level of the bot
  int getBotOxygenLevel();
  // function that fetches the game mode of the bot
  String getBotGameMode();
  // function that allows you to check if it is raining or not (it goes to true if it rains or there is a storm)
  bool isRaining();
  // function that fetches the response time from the game
  int getPing();
  // function that fetches the x-axis of the bot's position
  double getBotPositionX();
  // function that fetches the y-axis of the bot's position
  double getBotPositionY();
  // function that fetches the z-axis of the bot's position
  double getBotPositionZ();
  // function that places a specific block from the bot
  void placeBlock(String block);
  // move the bot forward one block
  void botGoForward();
  // make the bot move one block back
  void botGoBack();
  // make the bot move left one block
  void botGoLeft();
  // make the bot move right one block
  void botGoRight();
  // make the bot stop
  void botStop();
  // make the bot perform a jump
  void botJump();
  // wait for the bot to finish doing the current operation
  void waitBot();
  // create a link to show in the game chat
  void createChatLink(String text, String color, String url);
  // assign tag to entity
  void addTagToEntity(String tag, String entity);
  // remove tag to entity
  void removeTagToEntity(String tag, String entity);
};

#endif