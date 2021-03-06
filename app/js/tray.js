'use strict';

const {Tray, Menu} = require('electron');
const config = require('./config');
const manager = require('./manager');

module.exports = new class extends Tray {

    /**
     * Constructor for the class
     * @param {String} path
     */
    constructor(path = false) {
        if (path === false) {
            path = config.APP_ICON;
        }
        super(path);

        //Set tooltip for the tray icon
        this.setToolTip(config.NAME);

        //Create the context menu
        this.contextMenu = this._createMenu();
        this.setContextMenu(this.contextMenu);
    }

    /**
     * Activate a host
     * @param {Array} host
     */
    activateHost(host) {
        //Activate the selected host file
        //this.setTitle("Title");

    }

    /**
     * Update hosts from host manager
     * @param {Array} hosts
     */
    updateHosts(hosts) {
        //
        this.contextMenu.items[0].enabled = false;
        this.contextMenu.this.setContextMenu(this.contextMenu);
        //this.contextMenu.

    }

    /**
     * Create the context menu for the Tray
     * @param {Array} hosts Array containing the host names to include in the tray menu
     * @returns {Electron.Menu}
     * @private
     */
    _createMenu(hosts = []) {
        hosts = manager.getAllHost();

        let template = [];

        //Hosts menu items
        hosts.forEach((host, index) => {
            template.push({
                //id: '',
                type: 'radio',
                label: host.name,
                //sublabel: value,
                checked: host.active,
                click: ((menuItem, browserWindow, event) => {
                    this.setTitle(menuItem.label);
                    console.log(menuItem.label);
                }).bind(this)
            });
        });

        //Default menu items
        template = template.concat([{
            type: 'separator'
        }, {
            type: 'normal',
            label: 'Show Editor',
            description: 'Show host editor window.',
            click() {
                require('./window').showMainWindow();
            }
        }, {
            type: 'normal',
            label: 'Preferences',
            description: 'Show preferences.',
            click() {
                require('./window').showSettingsWindow();
            }
        }, {
            type: 'normal',
            label: 'About',
            description: 'Hostigniter about page.',
            click() {
                require('electron').shell.openExternal(config.HOMEPAGE)
            }
        }, {
            type: 'separator'
        }, {
            type: 'normal',
            label: 'Quit Hostigniter',
            description: 'Quit Hostigniter.',
            click() {
                require('electron').app.isQuiting = true;
                require('electron').app.quit();
            }
        }]);

        //Build Menu from template
        return Menu.buildFromTemplate(template);
    }
}();
