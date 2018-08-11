'use strict';

const path = require('path');

const APP_NAME = 'Hostigniter';

const USER_HOME = process.platform === 'win32' ? process.env.USERPROFILE || '' : process.env.HOME || process.env.HOMEPATH || '';

//App constants
const APP_PATH = path.join(__dirname, '..');

const APP_ASSETS = path.join(APP_PATH, 'assets');

const APP_ICON = path.join(APP_ASSETS, 'images', process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png');

module.exports = {
    APP_NAME: APP_NAME,
    APP_PATH: APP_PATH,
    APP_ICON: APP_ICON,
    APP_ASSETS: APP_ASSETS,
    USER_HOME: USER_HOME
};