# ArduCraft

ArduCraft is a Node.js and Electron-based software that enables the connection between Arduino and the Minecraft game. This application facilitates interaction between the physical world of Arduino and the virtual environment of Minecraft, opening up new possibilities for automation and hardware device integration into your gaming world.

The combined use of Minecraft command blocks and ArduCraft presents unique possibilities. Minecraft command blocks allow for the creation of complex mechanisms and automations within the game, while ArduCraft links these virtual elements to the physical world through Arduino. This integration enables the incorporation of real-world hardware devices into the game dynamics, opening new frontiers in automation, STEM learning, and the immersive experience of Minecraft.

Achieve Arduino-Minecraft integration effortlessly with ArduCraf no mods required. Unleash creativity and STEM learning in the vanilla game environment.

![Screenshot 2023-11-26 224309](https://github.com/filoconnesso/Arducraft/assets/63156681/8f6d3024-f115-4eb6-88a9-e05c62d7dc5f)

## Key Features

- **Arduino-Minecraft Connection:** ArduCraft streamlines communication between Arduino and Minecraft, allowing control over physical devices in the game.
- **Automation:** Automate actions in Minecraft based on inputs from Arduino. For example, you can control doors, lights, or other elements in the game using physical sensors connected to Arduino.
- **STEM** ArduCraft merges Arduino and Minecraft, fostering hands-on STEM learning. It integrates coding, electronics, and automation, making STEM concepts tangible. Students collaborate, solve problems, and explore real-world applications, enhancing coding proficiency in an engaging, gamified environment.

## System Requirements

- [Node.js](https://nodejs.org/) installed
- [Electron](https://www.electronjs.org/) installed (`npm install electron -g`)
- Minecraft version 1.19 or 1.20

## Installation

Navigate to the folder where the downloaded arducraft.js file is located from this repository. The file is in the "Client" folder.

Example possible path:

```bash
$ user\downloads\Arducraft\Client
```

1. Install dependencies:

```bash
npm install
```

2. Force update:

```bash
npm update
```

3. Install Electron:

```bash
npm install electron -g
```

4. Install electron-packager (for compiling the executable application):

```bash
npm install electron-packager -g
```

5. Resolve any vulnerabilities:

```bash
npm audit fix --force
```

6. Start the Arducraft client:

```bash
electron arducraft
```

7. Compile the Arducraft client (optional):

```bash
# Windows
electron-packager . --overwrite --asar=true --platform=win32 --arch=ia32 --prune=true --out=release-builds --version-string.CompanyName=FiloConnesso --version-string.FileDescription=CE --version-string.ProductName="Arducraft Client"

# macOS
electron-packager . --overwrite --platform=darwin --arch=x64 --prune=true --out=release-builds

# Linux
electron-packager . --overwrite --asar=true --platform=linux --arch=x64 --prune=true --out=release-builds
```

## Startup

1. Connect Arduino to your computer.
2. Launch the Arduino IDE.
3. Install the "Arduino Library" from the Library Manager.
4. Open one of the examples available in the library, for example, "LedDemo."
5. Upload the code to your Arduino.
6. Start Minecraft version 1.19 or 1.20.
7. Create a new world and open the LAN game, using the port suggested by the game or set a preferred port (e.g., 11111).
8. Launch the Arducraft Client (as described above).
9. Select the port where Arduino is connected.
10. Specify the IP of the local server or your PC; if you want to access the same shared game from your computer, specify "localhost."
11. Specify the port used for the shared game.
12. Specify the server version (1.19 or 1.20).
13. Give your bot a name (e.g., ArduCraft).
14. The bot will log in to your game and display a welcome message in chat when it's ready.
15. By typing the message "ledon" or "ledoff" in chat, the builtin LED of your Arduino should turn on and off according to the command!

![Screenshot 2023-11-26 225251](https://github.com/filoconnesso/Arducraft/assets/63156681/bda26aab-a79c-4b4a-8563-74752d750046)

![Screenshot 2023-11-26 225326](https://github.com/filoconnesso/Arducraft/assets/63156681/5639b208-f70f-4f61-bc20-753f67973322)

**Enjoy!**

## Contributions

We welcome contributions and improvements! If you have suggestions, bug reports, or want to contribute to development, fork the repository and submit a pull request.

## License

This project is distributed under the [MIT License](LICENSE).

This software bases its operation using mineflayer. [Mineflayer](https://github.com/PrismarineJS/mineflayer)

---

*Note: Make sure to respect the licenses of Minecraft and Arduino when using this software.*
