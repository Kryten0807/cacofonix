
var OFF = 0, WARN = 1, ERROR = 2;

module.exports = exports = {
    "extends": "eslint-config-airbnb",
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "node": true,
        "mocha": true
    },
    "rules": {
        "react/no-multi-comp": OFF,
        "import/default": OFF,
        "import/no-duplicates": OFF,
        "import/named": OFF,
        "import/namespace": OFF,
        "import/no-unresolved": OFF,
        "import/no-named-as-default": ERROR,
        "comma-dangle": OFF,
        "indent": [WARN, 4, {"SwitchCase": 1}],
        "no-alert": OFF,

        "padded-blocks": OFF,
        "no-multiple-empty-lines": WARN,
        "react/jsx-indent": [WARN, 4],
        "react/jsx-indent-props": [WARN, 4],
        "prefer-template": WARN,

        // allow .js files to contain JSX code
        //
        "react/jsx-filename-extension": [ERROR, { "extensions": [".js", ".jsx"] }],

        // dependencies
        // This one is annoying - it keeps complaining about my devDependencies
        // not being in the "dependencies" section when I lint specs.
        //
        "import/no-extraneous-dependencies": OFF,

        // warning comments
        //
        "no-warning-comments": [ WARN, { terms: [ '@todo', '@fixme' ]} ],

        // turn on no-console (as a warning), except for console.error,
        // console.warn, console.info, console.debug
        //
        "no-console": [ WARN, { allow: ['error', 'warn', 'info', 'debug'] }],

        // add an exception to the "id-length" rule to permit the use of "_" for
        // the lodash package
        //
        "id-length": [ ERROR, { "exceptions": ["_"] } ],

        // I would like to set this to ERROR, but it will take a fair bit of
        // rewriting. So, I'm going to set this to WARN for now...
        //
        "react/prefer-stateless-function": WARN,

        // I'd prefer to turn this on & make it strict, but there is code that I
        // can't control that's using underscores...
        //
        "no-underscore-dangle": OFF,

        // here's another one I'd like to turn off, but the API uses this
        // - specifically, when handling an HTTP request, it is necessary to
        // modify the session property
        //
        "no-param-reassign": [WARN, { "props": true }],

        // this one is about key spacing in object declarations. I like my
        // values aligned
        //
        "key-spacing": [ERROR, {
            "mode": "minimum",
            "align": "value"
        }],
    },
    "plugins": [
        "react", "import"
    ],
    "settings": {
        "import/parser": "babel-eslint",
        "import/resolve": {
            "moduleDirectory": ["node_modules", "src"]
        }
    },
    "globals": {
        "__DEVELOPMENT__": true,
        "__CLIENT__": true,
        "__SERVER__": true,
        "__DISABLE_SSR__": true,
        "__DEVTOOLS__": true,
        "socket": true,
        "webpackIsomorphicTools": true
    }
};
