function assertAndCall(x: object, y: string): boolean {
	if (x[y]) {
		(x[y] as () => any)();
		return true;
	}
	return false;
}

/* Open fullscreen */
function openFullscreen(): void {
	if (!assertAndCall(document.documentElement, "requestFullscreen")) {
		if (!assertAndCall(document.documentElement, "mozRequestFullScreen")) {
			if (!assertAndCall(document.documentElement, "webkitRequestFullscreen")) {
				assertAndCall(document.documentElement, "msRequestFullscreen");
			}
		}
	}
}

/* Close fullscreen */
function closeFullscreen(): void {
	if (!assertAndCall(document, "exitFullscreen")) {
		if (!assertAndCall(document, "mozCancelFullScreen")) {
			if (!assertAndCall(document, "webkitExitFullscreen")) {
				assertAndCall(document, "msExitFullscreen");
			}
		}
	}
}

async function readFile(url: string) {
	return fetch(url, { mode: "no-cors" }).then((data) => {
		return data.text();
	});
}
