# ArduCraft Library Documentation

## Introduction
ArduCraft is a Node.js and Electron-based software that facilitates the connection between Arduino and the Minecraft game. This application enables interaction between the physical world of Arduino and the virtual environment of Minecraft, opening new possibilities for automation and the integration of hardware devices into your gaming world.

The combined use of Minecraft command blocks and ArduCraft offers unique possibilities. Minecraft command blocks allow the creation of complex mechanisms and automations in the game, while ArduCraft connects these virtual elements to the physical world through Arduino. This integration allows the incorporation of real-world hardware devices into the gaming dynamics, opening new frontiers in automation, STEM learning, and the immersive experience of Minecraft.

Achieve effortless Arduino-Minecraft integration with ArduCraft, without the need for mods. Unleash creativity and STEM learning in the "vanilla" gaming environment.

## Build Information
```cpp
const char file_name[] = __FILE__;
const char compile_date[] = __DATE__;
const char compile_time[] = __TIME__;
```

## Arducraft Class

### Private Variables
- `String spawnValue`: String for the spawn state.
- `String kickedValue`: String for the kick state.
- `String endValue`: String for the closure state.
- `String deathValue`: String for the death state.
- `String healthValue`: String for the health state.
- `String errorValue`: String for the error state.
- `String rainingValue`: String for the rain state.
- `String botMovingValue`: String for the bot movement state.
- `String lastBotDatas`: Variable containing the last data from the code.
- `String lastMessage`: Variable containing the last message from the game chat.
- `String oldWriteMessage`: Variable for blocking message writing.
- `bool spawn, kicked, end, death, health, error`: Temporary bot states (default to false).
- `String errorMessage`: Contains the last error message from the game.
- `unsigned long worldTime`: Current game time.
- `int botExperience, botHealth, botFood, botOxygen`: Bot vital values.
- `String botGameMode`: Bot game mode.
- `bool raining`: Current weather state (true if raining or there is a storm).
- `int pingValue`: Game response time.
- `bool botMoving`: Indicates if the bot is moving.
- `Stream *serial`: Stream object assigned to the serial communication port with the game.
- `float botPositionX, botPositionY, botPositionZ`: Current bot position.

### Public Methods

#### Constructor
```cpp
Arducraft();
```
Arducraft class constructor.

#### `void begin(Stream *newserial)`
```cpp
void begin(Stream *newserial);
```
Initializes bot serial communication.

#### `String readMessage()`
```cpp
String readMessage();
```
Reads the last message sent to the game chat.

#### `void writeMessage(String message)`
```cpp
void writeMessage(String message);
```
Sends a message to the game chat.

#### `void setWorldTime(int value)`
```cpp
void setWorldTime(int value);
```
Sets the game time.

#### `void addWorldTime(int value)`
```cpp
void addWorldTime(int value);
```
Adds ticks to the game time.

#### `void setWeather(int weather_value)`
```cpp
void setWeather(int weather_value);
```
Sets the weather conditions.

#### `void teleportBotToPosition(float x, float y, float z)`
```cpp
void teleportBotToPosition(float x, float y, float z);
```
Teleports the bot to a desired position.

#### `void teleportEntityToPosition(String entity, float x, float y, float z)`
```cpp
void teleportEntityToPosition(String entity, float x, float y, float z);
```
Teleports an entity to a desired position.

#### `void teleportBotToEntity(String entity)`
```cpp
void teleportBotToEntity(String entity);
```
Teleports the bot to the position of a specific entity.

#### `void teleportEntityToEntity(String f_entity, String s_entity)`
```cpp
void teleportEntityToEntity(String f_entity, String s_entity);
```
Teleports an entity to the position of another entity.

#### `void setGameMode(String entity, int mode_value)`
```cpp
void setGameMode(String entity, int mode_value);
```
Sets the game mode for an entity.

#### `void spawnEntity(String entity)`
```cpp
void spawnEntity(String entity);
```
Creates an entity at the current bot position.

#### `void run()`
```cpp
void run();
```
Tracks the library functionality and controls the game.

#### `int getWorldTime()`
```cpp
int getWorldTime();
```
Returns the current game time.

#### `String getErrorMessage()`
```cpp
String getErrorMessage();
```
Returns the last error message from the game.

#### `bool botIsSpawned()`
```cpp
bool botIsSpawned();
```
Returns true if the bot is present on the map.

#### `bool botIsKicked()`
```cpp
bool botIsKicked();
```
Returns true if the bot has been kicked.

#### `bool botIsEnded()`
```cpp
bool botIsEnded();
```
Returns true if the bot is closed.

#### `bool botIsDead()`
```cpp
bool botIsDead();
```
Returns true if the bot is dead.

#### `bool botHealthIsChanged()`
```cpp
bool botHealthIsChanged();
```
Returns true if the bot's health state has changed.

#### `bool botErrorOccurred()`
```cpp
bool botErrorOccurred();
```
Returns true if a bot error has occurred.

#### `int getBotExperienceLevel()`
```cpp
int getBotExperienceLevel();
```
Returns the bot's experience level.

#### `int getBotHealthLevel()`
```cpp
int getBotHealthLevel();
```
Returns the bot's health level.

#### `int getBotHungerLevel()`
```cpp
int getBotHungerLevel();
```
Returns the bot's hunger level.

#### `int getBotOxygenLevel()`
```cpp
int getBotOxygenLevel();
```
Returns the bot's oxygen level.

#### `String getBotGameMode()`
```cpp
String getBotGameMode();
```
Returns the bot's game mode.

#### `bool isRaining()`
```cpp
bool isRaining();
```
Returns true if it is raining or there is a storm.

#### `int getPing()`
```cpp
int getPing();
```
Returns the game response time.

#### `double getBotPositionX()`
```cpp
double getBotPositionX();
```
Returns the x-coordinate of the bot's position.

#### `double getBotPositionY()`
```cpp
double getBotPositionY();
```
Returns the y-coordinate of the bot's position.

#### `double getBotPositionZ()`
```cpp
double getBotPositionZ();
```
Returns the z-coordinate of the bot's position.

#### `void placeBlock(String block)`
```cpp
void placeBlock(String block);
```
Places a specific block from the bot.

#### `void botGoForward()`
```cpp
void botGoForward();
```
Moves the bot forward by one block.

#### `void botGoBack()`
```cpp
void botGoBack

();
```
Moves the bot backward by one block.

#### `void botGoLeft()`
```cpp
void botGoLeft();
```
Moves the bot to the left by one block.

#### `void botGoRight()`
```cpp
void botGoRight();
```
Moves the bot to the right by one block.

#### `void botStop()`
```cpp
void botStop();
```
Stops the bot's movement.

#### `void botJump()`
```cpp
void botJump();
```
Makes the bot perform a jump.

#### `void waitBot()`
```cpp
void waitBot();
```
Waits for the bot to complete the current operation.

#### `void createChatLink(String text, String color, String url)`
```cpp
void createChatLink(String text, String color, String url);
```
Creates a link to display in the game chat.

#### `void addTagToEntity(String tag, String entity)`
```cpp
void addTagToEntity(String tag, String entity);
```
Assigns a tag to an entity.

#### `void removeTagToEntity(String tag, String entity)`
```cpp
void removeTagToEntity(String tag, String entity);
```
Removes a tag from an entity.