const {app, BrowserWindow, Menu, Tray} = require('electron');

class App {

    constructor() {
        let t = APP_FOLDER_PATH;
        console.log('constructor called.');
    }

    boot(){
        console.log('boot.');
    }
}

export default App;