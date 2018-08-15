'use strict';

const {app, BrowserWindow} = require('electron');
const manager = require('./manager');

module.exports = new class App {

    constructor() {

        //this.tray = new Tray();
        //let t = APP_FOLDER_PATH;
        console.log('constructor called.');
    }

    init() {
        //We need to wait for the app to be ready in order to create the Tray
        require('./tray');
        console.log('app init.');
    }


}()
