function init() {
	var libraries = ["util.js"];
	var scripts = ["index.js"];
	let doneLoading = 0;
	libraries.forEach((x) => {
		createScript("libraries/" + x, () => {
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

function loadScriptArray(inps: string[], dir: string = "") {
	if (inps[0]) {
		createScript(dir + inps[0], () => {
			inps = inps.splice(1);
			loadScriptArray(inps, dir);
		});
	}
}

function loadEruda() {
	var script = document.createElement("script");
	script.src = "//cdn.jsdelivr.net/npm/eruda";
	document.body.appendChild(script);
	script.onload = function () {
		//@ts-ignore
		eruda.init();
		init();
	};
}

function createScript(src: string, onload) {
	var _script = document.createElement("script");
	_script.src = src;
	_script.onload = onload;
	document.body.appendChild(_script);
}
