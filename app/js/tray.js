'use strict';

const {Tray, Menu} = require('electron');
const path = require('path');
const config = require('./config');

module.exports = class extends Tray {

    /**
     * Constructor for the class
     * @param path
     */
    constructor(path = false) {
        if (path === false) {
            path = config.APP_ICON;
        }
        super(path);


        this.setTitle("Title");

        this.setToolTip('Hostigniter');

        this.contextMenu = this._createMenu();
        this.setContextMenu(this.contextMenu);


    }

    /**
     * Update hosts
     * @param {Array} hosts
     */
    updateHosts(hosts) {
        //this.contextMenu.items.splice(0, 1);
        this.contextMenu.items[0].enabled = false;
        this.contextMenu.
        this.setContextMenu(this.contextMenu);
        //this.contextMenu.

    }

    /**
     * Activate a host
     * @param host
     */
    activateHost(host) {
        //Activate the selected host file
        //this.setTitle("Title");

    }

    /**
     * Create the context menu for the Tray
     * @returns {Electron.Menu}
     * @private
     */
    _createMenu() {
        return Menu.buildFromTemplate([
            {
                id: 'host-1',
                label: 'Host 1',
                type: 'radio',
                checked: true
            },
            {
                label: 'Host 2',
                type: 'radio'
            }, {
                type: 'separator'
            }, {
                type: 'normal',
                label: 'Preferences',
                description: 'Show preferences.'
            }
        ]);
    }
}
