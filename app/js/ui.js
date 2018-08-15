'use strict';

const {BrowserWindow} = require('electron');
const {NAME, APP_ICON} = require('./config');

module.exports = new class UI extends BrowserWindow {
    constructor() {
        super(UI.getDefaultOptions())
    }

    /**
     *
     * @return {{center: boolean, minWidth: number, skipTaskbar: boolean, title: (string|*), icon: *, acceptFirstMouse: boolean}}
     */
    static getDefaultOptions() {
        return {
            center: true,
            // minHeight: 200,
            // maxHeight: 300,
            minWidth: 200,
            //maxWidth: 400,
            skipTaskbar: false, //Whether to show the window in taskbar
            title: NAME,
            icon: APP_ICON, //The window icon
            acceptFirstMouse: false, //Whether the web view accepts a single mouse-down event that simultaneously activates the window
        }
    }

    showSettings() {

    }

}