'use strict';

const {app, BrowserWindow} = require('electron');

module.exports = new (class {

    constructor() {

        //this.tray = new Tray();
        //let t = APP_FOLDER_PATH;
        console.log('constructor called.');
    }

    boot() {
        //We need to wait for the app to be ready in order to create the Tray
        this.tray = require('./tray');
        console.log('boot.');
    }
})()
