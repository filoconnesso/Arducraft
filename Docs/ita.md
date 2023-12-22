# Documentazione della libreria ArduCraft

## Introduzione
ArduCraft è un software basato su Node.js ed Electron che facilita la connessione tra Arduino e il gioco Minecraft. Questa applicazione permette l'interazione tra il mondo fisico di Arduino e l'ambiente virtuale di Minecraft, aprendo nuove possibilità per l'automazione e l'integrazione di dispositivi hardware nel tuo mondo di gioco.

L'uso combinato di blocchi di comando di Minecraft e ArduCraft offre possibilità uniche. I blocchi di comando di Minecraft consentono la creazione di meccanismi complessi e automazioni nel gioco, mentre ArduCraft collega questi elementi virtuali al mondo fisico attraverso Arduino. Questa integrazione consente l'incorporazione di dispositivi hardware del mondo reale nella dinamica di gioco, aprendo nuove frontiere nell'automazione, nell'apprendimento STEM e nell'esperienza immersiva di Minecraft.

Raggiungi l'integrazione Arduino-Minecraft senza sforzo con ArduCraft, senza la necessità di mod. Libera la creatività e l'apprendimento STEM nell'ambiente di gioco "vanilla".

## Informazioni sulla compilazione
```cpp
const char file_name[] = __FILE__;
const char compile_date[] = __DATE__;
const char compile_time[] = __TIME__;
```

## Classe Arducraft

### Variabili private
- `String spawnValue`: Stringa per lo stato di spawn.
- `String kickedValue`: Stringa per lo stato di kick.
- `String endValue`: Stringa per lo stato di chiusura.
- `String deathValue`: Stringa per lo stato di morte.
- `String healthValue`: Stringa per lo stato di salute.
- `String errorValue`: Stringa per lo stato di errore.
- `String rainingValue`: Stringa per lo stato di pioggia.
- `String botMovingValue`: Stringa per lo stato di movimento del bot.
- `String lastBotDatas`: Variabile che contiene gli ultimi dati dal codice.
- `String lastMessage`: Variabile che contiene l'ultimo messaggio dalla chat di gioco.
- `String oldWriteMessage`: Variabile per il blocco della scrittura del messaggio.
- `bool spawn, kicked, end, death, health, error`: Stati temporanei del bot (di default sono falsi).
- `String errorMessage`: Contiene l'ultimo messaggio di errore dal gioco.
- `unsigned long worldTime`: Tempo corrente del gioco.
- `int botExperience, botHealth, botFood, botOxygen`: Valori vitali del bot.
- `String botGameMode`: Modalità di gioco del bot.
- `bool raining`: Stato attuale del tempo (true se piove o c'è una tempesta).
- `int pingValue`: Tempo di risposta dal gioco.
- `bool botMoving`: Indica se il bot si sta muovendo.
- `Stream *serial`: Oggetto Stream assegnato alla porta seriale di comunicazione con il gioco.
- `float botPositionX, botPositionY, botPositionZ`: Posizione corrente del bot.

### Metodi pubblici

#### Costruttore
```cpp
Arducraft();
```
Costruttore della classe Arducraft.

#### `void begin(Stream *newserial)`
```cpp
void begin(Stream *newserial);
```
Inizializza la comunicazione seriale del bot.

#### `String readMessage()`
```cpp
String readMessage();
```
Legge l'ultimo messaggio inviato nella chat di gioco.

#### `void writeMessage(String message)`
```cpp
void writeMessage(String message);
```
Invia un messaggio nella chat di gioco.

#### `void setWorldTime(int value)`
```cpp
void setWorldTime(int value);
```
Imposta il tempo del gioco.

#### `void addWorldTime(int value)`
```cpp
void addWorldTime(int value);
```
Aggiunge ticks al tempo del gioco.

#### `void setWeather(int weather_value)`
```cpp
void setWeather(int weather_value);
```
Imposta le condizioni meteorologiche.

#### `void teleportBotToPosition(float x, float y, float z)`
```cpp
void teleportBotToPosition(float x, float y, float z);
```
Teletrasporta il bot a una posizione desiderata.

#### `void teleportEntityToPosition(String entity, float x, float y, float z)`
```cpp
void teleportEntityToPosition(String entity, float x, float y, float z);
```
Teletrasporta un'entità a una posizione desiderata.

#### `void teleportBotToEntity(String entity)`
```cpp
void teleportBotToEntity(String entity);
```
Teletrasporta il bot alla posizione di un'entità specifica.

#### `void teleportEntityToEntity(String f_entity, String s_entity)`
```cpp
void teleportEntityToEntity(String f_entity, String s_entity);
```
Teletrasporta un'entità alla posizione di un'altra entità.

#### `void setGameMode(String entity, int mode_value)`
```cpp
void setGameMode(String entity, int mode_value);
```
Imposta la modalità di gioco per un'entità.

#### `void spawnEntity(String entity)`
```cpp
void spawnEntity(String entity);
```
Crea un'entità nella posizione corrente del bot.

#### `void run()`
```cpp
void run();
```
Traccia la funzionalità della libreria e controlla il gioco.

#### `int getWorldTime()`
```cpp
int getWorldTime();
```
Restituisce il tempo corrente del gioco.

#### `String getErrorMessage()`
```cpp
String getErrorMessage();
```
Restituisce l'ultimo messaggio di errore dal gioco.

#### `bool botIsSpawned()`
```cpp
bool botIsSpawned();
```
Restituisce true se il bot è presente nella mappa.

#### `bool botIsKicked()`
```cpp
bool botIsKicked();
```
Restituisce true se il bot è stato kickato.

#### `bool botIsEnded()`
```cpp
bool botIsEnded();
```
Restituisce true se il bot è chiuso.

#### `bool botIsDead()`
```cpp
bool botIsDead();
```
Restituisce true se il bot è morto.

#### `bool botHealthIsChanged()`
```cpp
bool botHealthIsChanged();
```
Restituisce true se è cambiato lo stato di salute del bot.

#### `bool botErrorOccurred()`
```cpp
bool botErrorOccurred();
```
Restituisce true se si è verificato un errore del bot.

#### `int getBotExperienceLevel()`
```cpp
int getBotExperienceLevel();
```
Restituisce il livello di esperienza del bot.

#### `int getBotHealthLevel()`
```cpp


int getBotHealthLevel();
```
Restituisce il livello di salute del bot.

#### `int getBotHungerLevel()`
```cpp
int getBotHungerLevel();
```
Restituisce il livello di fame del bot.

#### `int getBotOxygenLevel()`
```cpp
int getBotOxygenLevel();
```
Restituisce il livello di ossigeno del bot.

#### `String getBotGameMode()`
```cpp
String getBotGameMode();
```
Restituisce la modalità di gioco del bot.

#### `bool isRaining()`
```cpp
bool isRaining();
```
Restituisce true se sta piovendo o c'è una tempesta.

#### `int getPing()`
```cpp
int getPing();
```
Restituisce il tempo di risposta dal gioco.

#### `double getBotPositionX()`
```cpp
double getBotPositionX();
```
Restituisce la coordinata x della posizione del bot.

#### `double getBotPositionY()`
```cpp
double getBotPositionY();
```
Restituisce la coordinata y della posizione del bot.

#### `double getBotPositionZ()`
```cpp
double getBotPositionZ();
```
Restituisce la coordinata z della posizione del bot.

#### `void placeBlock(String block)`
```cpp
void placeBlock(String block);
```
Posiziona un blocco specifico dal bot.

#### `void botGoForward()`
```cpp
void botGoForward();
```
Muove il bot in avanti di un blocco.

#### `void botGoBack()`
```cpp
void botGoBack();
```
Muove il bot indietro di un blocco.

#### `void botGoLeft()`
```cpp
void botGoLeft();
```
Muove il bot a sinistra di un blocco.

#### `void botGoRight()`
```cpp
void botGoRight();
```
Muove il bot a destra di un blocco.

#### `void botStop()`
```cpp
void botStop();
```
Ferma il movimento del bot.

#### `void botJump()`
```cpp
void botJump();
```
Fa fare un salto al bot.

#### `void waitBot()`
```cpp
void waitBot();
```
Attende che il bot completi l'operazione corrente.

#### `void createChatLink(String text, String color, String url)`
```cpp
void createChatLink(String text, String color, String url);
```
Crea un link da mostrare nella chat di gioco.

#### `void addTagToEntity(String tag, String entity)`
```cpp
void addTagToEntity(String tag, String entity);
```
Assegna un tag a un'entità.

#### `void removeTagToEntity(String tag, String entity)`
```cpp
void removeTagToEntity(String tag, String entity);
```
Rimuove un tag da un'entità.