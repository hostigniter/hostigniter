"use strict";

const {Tray, Menu} = require('electron');

module.exports = class extends Tray {

    //icon = '';
    constructor(path) {

        super(path);

        this.setTitle("Title");

        this.setToolTip('Hostigniter');

        const contextMenu = Menu.buildFromTemplate([
            {
                label: 'Item1',
                type: 'radio',
                checked: true
            },
            {
                label: 'Item2',
                type: 'radio'
            }, {
                type: 'separator'
            }, {
                type: 'normal',
                label: 'Preferences',
                description: 'Show preferences.'
            }
        ]);
        this.setContextMenu(contextMenu);

    }

}
