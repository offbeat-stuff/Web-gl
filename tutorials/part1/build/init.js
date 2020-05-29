function init() {
    var libraries = ["util.js"];
    var scripts = ["index.js"];
    var doneLoading = 0;
    libraries.forEach(function (x) {
        createScript('libraries/' + x, function () {
            doneLoading++;
            if (doneLoading >= libraries.length) {
                loadScriptArray(scripts, "scripts/");
            }
        });
    });
    document.documentElement.addEventListener("dblclick", function (e) {
        openFullscreen();
    });
}
function loadScriptArray(inps, dir) {
    if (dir === void 0) { dir = ""; }
    if (inps[0]) {
        createScript(dir + inps[0], function () {
            inps = inps.splice(1);
            loadScriptArray(inps, dir);
        });
    }
}
function loadEruda() {
    var script = document.createElement('script');
    script.src = "//cdn.jsdelivr.net/npm/eruda";
    document.body.appendChild(script);
    script.onload = function () {
        //@ts-ignore
        eruda.init();
        init();
    };
}
function createScript(src, onload) {
    var _script = document.createElement("script");
    _script.src = src;
    _script.onload = onload;
    document.body.appendChild(_script);
}
