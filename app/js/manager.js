'use strict';

const fs = require('fs');
const util = require('util');
const {WORKSPACE, HOSTS, SYSTEM_HOST} = require('./config');

module.exports = new class Manager {

    /**
     * Constructor
     */
    constructor() {
        //this.init();
        this.json = this.init();
        //const {hosts} = this.instance();
        const t = 0;
    }

    init() {
        if (!fs.existsSync(WORKSPACE)) {
            //directory does not exist, lets create it
            fs.mkdirSync(WORKSPACE);
        }

        let json = {};
        try {
            //read file content
            const text = fs.readFileSync(HOSTS, 'utf8');
            json = JSON.parse(text);

            //lets check if the json is valid
            const {hosts} = json;
            if (!Array.isArray(hosts) || hosts.length == 0) {
                throw new Error();
            }
        } catch (e) {
            //the file does not exist or has an invalid format
            json = this.getDefaultJson();
            fs.writeFileSync(HOSTS, JSON.stringify(json), 'utf8')
        }
        return json
    }

    /**
     *
     */
    static instance() {

        if (!fs.existsSync(WORKSPACE)) {
            //directory does not exist, lets create it
            fs.mkdirSync(WORKSPACE);
        }

        return util.promisify(fs.readFile)(HOSTS, 'utf8').then((text) => {
            try {
                return Promise.resolve(JSON.parse(text));
            } catch (e) {
                return Promise.resolve({});
            }
        }).catch(() => {
            //error while reading file, lets return empty json
            return Promise.resolve({});
        }).then((json) => {
            //get the hosts section
            const {hosts} = json;

            const manager = new Manager(json);

            if (Array.isArray(hosts)) {
                // const hostsPromises = hosts.map((item) => {
                //     const __hosts = new Hosts(item);
                //     hostsMap.set(__hosts.uid, __hosts);
                //     return __hosts.load();
                // });
                // return Promise.all(hostsPromises).then(() => {
                //     manifest.hosts = hostsMap;
                //     return Promise.resolve(manifest);
                // });
            } else {
                //first time we run the app
                return manager.getDefaultJson().then((json) => {
                    manager.save(json);
                    return Promise.resolve(manager);
                });
            }
        });
    }

    /**
     *
     * @param id
     * @param name
     * @param content
     */
    addHost(id, name, content) {
        this.json.hosts.push({
            active: false,
            name: name,
            content: content
        })
    }

    renameHost() {

    }

    updateHost() {

    }

    activateHost() {

    }

    deleteHost() {

    }

    /**
     * Save content to file
     * @private
     * @param json
     */
    save(json = null) {
        if (json === null) {
            json = this.json
        }
        fs.writeFile(HOSTS, JSON.stringify(this.json), 'utf8');
    }

    /**
     * @private
     * @return {Object}
     */
    getDefaultJson() {
        return {
            hosts: [{
                active: true,
                name: 'Default',
                content: this.getSystemHostContent()
            }],
            settings: {
                startup: false
            }
        }
    }

    /**
     * Get current system host file content
     * @private
     * @return {string}
     */
    getSystemHostContent() {
        try {
            return fs.readFileSync(SYSTEM_HOST, 'utf8')
        } catch (e) {
            return ''
        }
    }
}