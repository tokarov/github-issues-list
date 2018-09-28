const JSDOM = require('jsdom').JSDOM;

global.document = new JSDOM('');
global.window = document.defaultView;
global.window.console.warn = function warn() {};
Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        global[property] = document.defaultView[property];
    }
});

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);
