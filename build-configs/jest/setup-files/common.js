process.env.TEST = true;
require('core-js/fn/promise');

global.localStorage = global.sessionStorage = (() => {
    let store = {};
    return {
        getItem: key => store[key],
        setItem: (key, value) => {
            store[key] = value.toString();
        },
        clear: () => {
            store = {};
        },
        removeItem: (key) => {
            delete store[key];
        }
    };
})();

global.navigator = {
    userAgent: 'node.js'
};

global.DEBUG = false;

global.MouseEvent = window.MouseEvent;
