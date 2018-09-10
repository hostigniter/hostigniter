'use strict';

const fs = require('fs');
const uid = require('uid');
const {WORKSPACE, HOSTS, SYSTEM_HOST} = require('./config');

module.exports = new class Manager {

    /**
     * Constructor
     */
    constructor() {
        //this.init();
        this.json = this.init();
    }

    /**
     *
     * @return {Object}
     */
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
            this.save(json);
        }
        return json
    }

    /**
     *
     * @param name
     * @return {Object}
     */
    getHost(name) {
        return this.json.hosts.find(item => item.name === name);

    }

    /**
     *
     * @param name
     * @return {number}
     */
    getHostIndex(name) {
        return this.json.hosts.findIndex(item => item.name === name);
    }

    /**
     *
     * @param name
     * @return {number}
     */
    getActiveHost(name) {
        return this.json.hosts.findIndex(item => item.active === true);
    }

    /**
     *
     * @return {Array}
     */
    getAllHost() {
        return this.json.hosts;
    }

    /**
     *
     * @param name
     * @param content
     */
    addHost(name, content) {
        this.json.hosts.push({
            active: false,
            name: name,
            content: content
        })
    }

    /**
     *
     * @param name
     * @param newName
     * @return {{active, name, content}|*}
     */
    renameHost(name, newName) {
        let index = this.json.hosts.findIndex(item => item.name === name);
        if (index) {
            this.json.hosts[index].name = name;
        }
        return this.json.hosts[index];
    }

    /**
     *
     * @param name
     */
    updateHost(name) {

    }

    /**
     *
     * @param name
     */
    activateHost(name) {
        let activeIndex = this.json.hosts.findIndex(item => item.active === true);
        this.json.hosts[activeIndex].active = false;
        let newIndex = this.json.hosts.findIndex(item => item.name === name);
        this.json.hosts[newIndex].active = true;
        this.save();
    }

    /**
     *
     * @param name
     */
    deleteHost(name) {
        delete this.json.hosts[this.getHostIndex(name)];
        this.save();
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
        fs.writeFile(HOSTS, JSON.stringify(json), 'utf8', (err) => {
            if (err) throw err;
            console.log('HOSTS file saved');
        });
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