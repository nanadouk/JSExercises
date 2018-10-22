function _require(name) {
    if (name in _require.cache) {
        return _require.cache[name];
    }
    var code = new Function("exports, module", readFile(name));
    var exports = {};
    var module = {exports: exports};
    code(exports, module);
    _require.cache[name] = module.exports;
    return module.exports;
}
global._require = _require;
_require.cache = Object.create(null);


function readFile(name) {
    var req = new XMLHttpRequest();
    req.overrideMimeType("text/javascript");
    req.open("GET", "modules/" + name + ".js", false);
    req.send(null);
    return req.responseText;
}

function readFile(name) {
    var fs = require("fs");
    var content = fs.readFileSync("modules/" + name + ".js");
    return content;
}

var morse = _require("morse");
morse.write("java script");

var slim = _require("slim");
slim.write("JAVA SCRIPT");
