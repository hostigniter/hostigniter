'use strict';

const {BrowserWindow} = require('electron');
const {NAME, APP_ICON, APP_HTML} = require('./config');
const path = require('path');
const url = require('url');

module.exports = new class Window extends BrowserWindow {

    constructor() {
        super(Window.getDefaultOptions());
        this.on('minimize', this.onMinimize);
        this.on('close', this.onClose);
        this.on('unresponsive', this.onUnresponsive);
        this.webContents.on('crashed', this.onCrashed);
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

    /**
     * Show editor window
     */
    showMainWindow() {
        let filePath = url.format({
            protocol: 'file',
            slashes: true,
            pathname: path.join(APP_HTML, 'main.html')
        });
        this.loadURL(filePath);
        this.show();
    }

    /**
     * Show settings window
     */
    showSettingsWindow() {
        let filePath = url.format({
            protocol: 'file',
            slashes: true,
            pathname: path.join(APP_HTML, 'settings.html')
        });
        this.loadURL(filePath);
        this.show();
    }

    /**
     *
     * @param event
     */
    onMinimize(event) {
        event.preventDefault();
        this.hide();
    }

    /**
     *
     * @param event
     * @return {boolean}
     */
    onClose(event) {
        if (!require("electron").app.isQuiting) {
            event.preventDefault();
            this.hide();
        }
        return false;
    }

    /**
     * Window crashed event
     */
    onCrashed() {
        const options = {
            type: 'info',
            title: 'Renderer Process Crashed',
            message: 'This process has crashed.',
            buttons: ['Reload', 'Close']
        };

        require('electron').dialog.showMessageBox(options, (index) => {
            if (index === 0) require('./window').reload()
            else require('./window').close()
        })
    }

    /**
     * Renderer Process Hanging
     */
    onUnresponsive() {
        const options = {
            type: 'info',
            title: 'Renderer Process Hanging',
            message: 'This process is hanging.',
            buttons: ['Reload', 'Close']
        }

        require('electron').dialog.showMessageBox(options, (index) => {
            if (index === 0) require('./window').reload()
            else require('./window').close()
        })
    }

}