/*

MIT License

Copyright (c) 2023 Filo Connesso

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Author : Alessandro Marcon, Mirko Pacioni

*/

const mineflayer = require("mineflayer");
const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require("@serialport/parser-readline");
const path = require('path');
const Vec3 = require("vec3").Vec3;
const Rx = require("rxjs");
const fs = require('fs');

const IPC_CHANNEL = 'ipc';

let endConnection = false;

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        icon: __dirname + "/assets/images/icon.png",
        webPreferences: {
            nodeIntegration: true,
            nativeWindowOpen: true,
            contextIsolation: false,
        }
    })
    mainWindow.loadFile('main.html');
    mainWindow.setResizable(false);

}

let configData = {
    hostname: "",
    port: "",
    version: "",
    bot_name: "",
};

let curComPort;

ipcMain.on(IPC_CHANNEL, (event, data) => {
    let ipcData = data;
    let dataSettingsSplitted = ipcData.split(',');
    if (dataSettingsSplitted[0] == 'LOAD_CONFIG') {
        if (fs.existsSync("./config.json")) {
            let data = JSON.parse(fs.readFileSync("./config.json"));
            event.reply(IPC_CHANNEL, "CONFIG," + data.hostname + "," + data.port + "," + data.version + "," + data.bot_name);
        }
    }
    if (dataSettingsSplitted[0] == "UPDATE_SERIAL_PORT_LIST") {
        SerialPort.list().then(function (ports) {
            ports.forEach(function (port) {
                event.reply(IPC_CHANNEL, "ADD_PORT," + port.path + "," + port.manufacturer);
            })
        });
    }
    if (dataSettingsSplitted[0] == 'CONNECT') {
        curComPort = dataSettingsSplitted[1];
        configData.hostname = dataSettingsSplitted[2];
        configData.port = dataSettingsSplitted[3];
        configData.version = dataSettingsSplitted[4];
        configData.bot_name = dataSettingsSplitted[5];
        event.reply(IPC_CHANNEL, "JSON_SETTINGS_CREATING");
        let data = JSON.stringify(configData);
        if (fs.existsSync("./config.json")) {
            fs.unlinkSync("./config.json");
        }
        fs.writeFileSync("config.json", data);
        if (fs.existsSync("./config.json")) {
            event.reply(IPC_CHANNEL, "JSON_SETTINGS_CREATED");
        } else {
            event.reply(IPC_CHANNEL, "JSON_SETTINGS_NOT_CREATED");
        }
    }
    if (dataSettingsSplitted[0] == "CLIENT_READY") {
        event.reply(IPC_CHANNEL, "BOT_STARTING");
        startBot(curComPort, configData.hostname, configData.port, configData.version, configData.bot_name);
        event.reply(IPC_CHANNEL, "BOT_STARTED");
    }
    if (dataSettingsSplitted[0] == 'DISCONNECT') {
        endConnection = true;
    }
});

app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

function startBot(serial_port, hostname, port, version, bot_name) {

    endConnection = false;

    const device = new SerialPort({
        path: serial_port,
        baudRate: 115200,
    });

    const bot = mineflayer.createBot({
        host: hostname,
        port: parseInt(port),
        username: bot_name,
        version: version,
    });

    let moving = false;

    let maxRefZ;
    let maxRefX;
    let minRefZ;
    let minRefX;
    let maxRefY;
    let minRefY;

    let botStarted = false;

    let minecraft_datas = [];

    minecraft_datas = [
        {
            spawn: false,
            kicked: false,
            end: false,
            death: false,
            health: false,
            error: false,
            errorMessage: null,
            worldTime: 0,
            botExperience: 0,
            botHealth: 0,
            botFood: 0,
            botOxygen: 0,
            botGameMode: null,
            raining: false,
            ping: 0,
            x: 0,
            y: 0,
            z: 0,
            botMoving: false,
            lastMessage: null,
        },
    ];

    function botMovingStop() {
        if (botStarted) {
            bot.setControlState("forward", false);
            bot.setControlState("back", false);
            bot.setControlState("left", false);
            bot.setControlState("right", false);
            bot.setControlState("jump", false);
            bot.lookAt(bot.entity.position.offset(0, bot.entity.height, 0));
            moving = false;
        }
    }

    bot.on("move", function () {
        if (moving) {
            if (
                bot.entity.position.x >= maxRefX ||
                bot.entity.position.x <= minRefX
            ) {
                botMovingStop();
                return;
            }
            if (
                bot.entity.position.z >= maxRefZ ||
                bot.entity.position.z <= minRefZ
            ) {
                botMovingStop();
                return;
            }
            if (bot.entity.position.y > maxRefY) {
                botMovingStop();
                return;
            }
        }
    });

    bot.on("spawn", function () {
        console.log("BOT CONSOLE >>> The bot appeared on the map");
        minecraft_datas[0]["spawn"] = true;
        botStarted = true;
        bot.lookAt(bot.entity.position.offset(0, bot.entity.height, 0));
        bot.chat("Welcome to ArduCraft, for updates check us on Github at Filo Connesso!");
        bot.chat("/tellraw @a {\"text\":\">>> Click for Github Repository <<<\",\"color\":\"red\",\"bold\":\"true\",\"underlined\":\"true\",\"clickEvent\":{\"action\":\"open_url\",\"value\":\"https://github.com/filoconnesso/arducraft\"}}");
    });

    bot.on("kicked", function () {
        console.log("BOT CONSOLE >>> The bot got kicked");
        minecraft_datas[0]["kicked"] = true;
    });

    bot.on("end", function () {
        console.log("BOT CONSOLE >>> The bot is out");
        minecraft_datas[0]["end"] = true;
    });

    bot.on("death", function () {
        console.log("BOT CONSOLE >>> The bot is dead");
        minecraft_datas[0]["death"] = true;
    });

    bot.on("health", function () {
        console.log("BOT CONSOLE >>> The bot's health has changed");
        minecraft_datas[0]["health"] = true;
    });

    bot.on("error", function (error_message) {
        console.log(`BOT CONSOLE >>> The bot gave an error : ${error_message}`);
        minecraft_datas[0]["errorMessage"] = error_message;
        minecraft_datas[0]["error"] = true;
    });

    function restoreBotDataLifeStatus() {
        minecraft_datas.forEach((datas) => {
            Object.entries(datas).forEach(([dataType, dataValue]) => {
                if (
                    dataType == "spawn" ||
                    dataType == "kicked" ||
                    dataType == "end" ||
                    dataType == "death" ||
                    dataType == "health" ||
                    dataType == "error"
                ) {
                    minecraft_datas[0][dataType] = false;
                }
            });
        });
    }

    function minecraftHandle() {
        if (device.isOpen) {
            if (botStarted) {
                let axis = bot.entity.position;
                minecraft_datas[0]["worldTime"] = bot.time.timeOfDay;
                minecraft_datas[0]["botExperience"] = bot.experience.points;
                minecraft_datas[0]["botHealth"] = bot.health;
                minecraft_datas[0]["botFood"] = bot.food;
                minecraft_datas[0]["botOxygen"] = bot.oxygenLevel;
                minecraft_datas[0]["botGameMode"] = bot.game.gameMode;
                minecraft_datas[0]["raining"] = bot.isRaining;
                minecraft_datas[0]["ping"] = bot.player.ping;
                minecraft_datas[0]["x"] = axis.x;
                minecraft_datas[0]["y"] = axis.y;
                minecraft_datas[0]["z"] = axis.x;
                minecraft_datas[0]["botMoving"] = moving;
                let minecraft_datas_string = "";
                minecraft_datas.forEach((datas) => {
                    Object.entries(datas).forEach(([dataType, dataValue]) => {
                        minecraft_datas_string += `${dataValue};`;
                    });
                });
                minecraft_datas_string += "endata";
                device.write(minecraft_datas_string + "\n");
                if (minecraft_datas[0]["kicked"] || minecraft_datas[0]["error"]) {
                    botStarted = false;
                }
                restoreBotDataLifeStatus();
            }
            if (endConnection) {
                bot.end();
                device.close();
                connectionStarted = false;
            }
        }
    }

    const parser = device.pipe(new ReadlineParser({ delimiter: "\n" }));

    let old_command = "";

    function ReadSerialPort() {
        parser.on("data", (data) => {
            if (botStarted) {
                let command = data;
                command = command.replace(/(\r\n|\n|\r)/gm, "");
                if (command != old_command) {
                    if (command.indexOf("[ARDUCRAFT CMD] bot walk forward") > -1) {
                        maxRefZ = Math.floor(bot.entity.position.z) + 1.2;
                        maxRefX = Math.floor(bot.entity.position.x) + 1.2;
                        minRefZ = Math.floor(bot.entity.position.z);
                        minRefX = Math.floor(bot.entity.position.x);
                        bot.setControlState("forward", true);
                        moving = true;
                    } else if (command.indexOf("[ARDUCRAFT CMD] bot walk back") > -1) {
                        maxRefZ = Math.floor(bot.entity.position.z) + 1.2;
                        maxRefX = Math.floor(bot.entity.position.x) + 1.2;
                        minRefZ = Math.floor(bot.entity.position.z);
                        minRefX = Math.floor(bot.entity.position.x);
                        bot.setControlState("back", true);
                        moving = true;
                    } else if (command.indexOf("[ARDUCRAFT CMD] bot walk left") > -1) {
                        maxRefZ = Math.floor(bot.entity.position.z) + 1.2;
                        maxRefX = Math.floor(bot.entity.position.x) + 1.2;
                        minRefZ = Math.floor(bot.entity.position.z);
                        minRefX = Math.floor(bot.entity.position.x);
                        bot.setControlState("left", true);
                        moving = true;
                    }
                    if (command.indexOf("[ARDUCRAFT CMD] bot walk right") > -1) {
                        maxRefZ = Math.floor(bot.entity.position.z) + 1.2;
                        maxRefX = Math.floor(bot.entity.position.x) + 1.2;
                        minRefZ = Math.floor(bot.entity.position.z);
                        minRefX = Math.floor(bot.entity.position.x);
                        bot.setControlState("right", true);
                        moving = true;
                    }
                    if (command.indexOf("[ARDUCRAFT CMD] bot jump") > -1) {
                        maxRefY = Math.floor(bot.entity.position.y) + 1.2;
                        minRefY = Math.floor(bot.entity.position.y);
                        bot.setControlState("jump", true);
                        moving = true;
                    }
                    if (command.indexOf("[ARDUCRAFT CMD] bot walk stop") > -1) {
                        botMovingStop();
                    } else if (command.indexOf("[ARDUCRAFT CMD] bot placeblock") > -1) {
                        let currentBlock = command.replace("[ARDUCRAFT CMD] bot placeblock", "");
                        currentBlock = currentBlock.trim(currentBlock);
                        bot.chat("/fill ~ ~ ~ ~ ~ ~ " + currentBlock);
                    } else if (command.indexOf("[ARDUCRAFT CMD] chatlink=") > -1) {
                        let currentChatLink = command.replace("[ARDUCRAFT CMD] chatlink=", "");
                        let linkParams = currentChatLink.split('+');
                        bot.chat(`/tellraw @a {\"text\":\"${linkParams[0]}\",\"color\":\"${linkParams[1]}\",\"bold\":\"true\",\"underlined\":\"true",\"clickEvent\":{\"action\":\"open_url\",\"value\":\"${linkParams[2]}\"}}`);
                    } else {
                        if (!moving) {
                            command = command.trim(command);
                            console.log(`BOT CONSOLE >>> ${command}`);
                            bot.lookAt(bot.entity.position.offset(0, bot.entity.height, 0));
                            let message_text = command.replace("/say ", "");
                            bot.chat(message_text);
                        }
                    }
                    old_command = command;
                }
            }
        });
    }

    bot.on("chat", (username, message) => {
        if (botStarted) {
            if (username === bot.username) return;
            minecraft_datas[0]["lastMessage"] = message;
        }
    });

    setInterval(minecraftHandle, 100);

    ReadSerialPort();

}
