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

const connectbtn = document.getElementById('connect');
const disconnectbtn = document.getElementById('disconnect');
const connectedwindow = document.getElementById('connectedwindow');
const portlistwindow = document.getElementById('portlistwindow');
const portlist = document.getElementById('portlist');
const comunicationport = document.getElementById('comport');
const servername = document.getElementById('server');
const serverport = document.getElementById('serverport');
const serverversion = document.getElementById('serverversion');
const botname = document.getElementById('botname');
const connectionmsg = document.getElementById('connectionmsg');

const { ipcMain, ipcRenderer } = require('electron');

const IPC_CHANNEL = 'ipc';

ipcRenderer.send(IPC_CHANNEL, "LOAD_CONFIG");

ipcRenderer.on(IPC_CHANNEL, (event, data) => {
    let ipcData = data;
    let dataSettingsSplitted = ipcData.split(",");
    if (dataSettingsSplitted[0] == "ADD_PORT") {
        var portButton = document.createElement("button");
        portButton.className = "medium-button port-select";
        portButton.innerText = dataSettingsSplitted[1] + " (" + dataSettingsSplitted[2] + ")";
        portButton.value = dataSettingsSplitted[1];
        portButton.style.marginLeft = "20px";
        portButton.style.display = "block";
        portButton.style.marginBottom = "5px";
        portlist.appendChild(portButton);
    }
    if (dataSettingsSplitted[0] == "JSON_SETTINGS_CREATING") {
        connectionmsg.innerText = 'SAVING SETTINGS...';
    }
    if (dataSettingsSplitted[0] == "JSON_SETTINGS_CREATED") {
        connectionmsg.innerText = 'SETTINGS SAVED!';
        ipcRenderer.send(IPC_CHANNEL, "CLIENT_READY");
    }
    if (dataSettingsSplitted[0] == "JSON_SETTINGS_NOT_CREATED") {
        connectionmsg.style.color = "red";
        connectionmsg.innerText = 'SAVING SETTINGS ERROR!';
        disconnectbtn.style.display = "block";
        disconnectbtn.innerText = "CLOSE";
    }
    if (dataSettingsSplitted[0] == "CONFIG") {
        servername.value = dataSettingsSplitted[1];
        serverport.value = dataSettingsSplitted[2];
        serverversion.value = dataSettingsSplitted[3];
        botname.value = dataSettingsSplitted[4];
    }
    if (dataSettingsSplitted[0] == "BOT_STARTING") {
        connectionmsg.style.color = "black";
        connectionmsg.innerText = 'CHECKING...';
        disconnectbtn.style.display = "block";
    }
    if (dataSettingsSplitted[0] == "BOT_STARTED") {
        connectionmsg.style.color = "green";
        connectionmsg.innerText = 'STARTED!';
        disconnectbtn.style.display = "block";
        disconnectbtn.innerText = "DISCONNECT";
    }
});

var reflist = document.querySelector('#portlist');
var portselector = '.port-select';

reflist.addEventListener('click', function (thisselector) {
    var closest = thisselector.target.closest(portselector);
    if (closest && reflist.contains(closest)) {
        portlistwindow.style.display = "none";
        comunicationport.value = thisselector.target.value;
    }
});

comunicationport.addEventListener('click', () => {
    portlistwindow.style.display = "block";
    portlist.innerHTML = "";
    ipcRenderer.send(IPC_CHANNEL, "UPDATE_SERIAL_PORT_LIST");
});

connectbtn.addEventListener('click', () => {
    connectionmsg.style.color = "black";
    connectionmsg.innerText = 'STARTING...';
    disconnectbtn.style.display = "none";
    connectedwindow.style.display = "block";
    let curComPort = comunicationport.value;
    let curServerName = servername.value;
    let curServerPort = serverport.value;
    let curServerVersion = serverversion.value;
    let curBotName = botname.value;
    curComPort.trim();
    curServerName.trim();
    curServerPort.trim();
    curServerVersion.trim();
    curBotName.trim();
    if (curComPort != "" && curServerName != "" && curServerPort != "" && curServerPort != "" && curBotName != "") {
        let curConnectionSettings = "CONNECT" + "," + curComPort + "," + curServerName + "," + curServerPort + "," + curServerVersion + "," + curBotName;
        ipcRenderer.send(IPC_CHANNEL, curConnectionSettings);
    } else {
        connectionmsg.style.color = "red";
        disconnectbtn.style.display = "block";
        connectionmsg.innerText = 'INSERT ALL INFO!';
        disconnectbtn.innerText = "CLOSE";
    }
});

disconnectbtn.addEventListener('click', () => {
    connectedwindow.style.display = "none";
    if (connectbtn.value = "DISCONNECT") {
        ipcRenderer.send(IPC_CHANNEL, "DISCONNECT,NULL");
    }
    if (connectbtn.value = "CLOSE") {
        
    }
});