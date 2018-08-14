'use strict';

const path = require('path');

//General config options
const NAME = 'Hostigniter';
const VERSION = '0.0.1';
const AUTHOR = 'Me ;)';
const HOMEPAGE = 'https://hostigniter.github.io';
const RELEASES_URL = 'https://hostigniter.github.io/releases';

//App config options
const APP_PATH = path.join(__dirname, '..');
const APP_ASSETS = path.join(APP_PATH, 'assets');
const APP_ICON = path.join(APP_ASSETS, 'images', process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png');

//OS config options
const USER_HOME = process.platform === 'win32' ? process.env.USERPROFILE || '' : process.env.HOME || process.env.HOMEPATH || '';
const WORKSPACE = path.join(USER_HOME, '.' + NAME.toLowerCase());
const HOSTS = path.join(WORKSPACE, './hosts.json');
const SYSTEM_HOST = (process.platform === 'win32') ? path.join(process.env.SYSTEMROOT, './system32/drivers/etc/hosts') : '/etc/hosts';
const LOG = path.join(WORKSPACE, './log.txt');

module.exports = {
    NAME: NAME,
    VERSION: VERSION,
    AUTHOR: AUTHOR,
    HOMEPAGE: HOMEPAGE,
    RELEASES_URL: RELEASES_URL,
    APP_PATH: APP_PATH,
    APP_ASSETS: APP_ASSETS,
    APP_ICON: APP_ICON,
    USER_HOME: USER_HOME,
    WORKSPACE: WORKSPACE,
    HOSTS: HOSTS,
    SYSTEM_HOST: SYSTEM_HOST,
    LOG: LOG,
}