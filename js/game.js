$(document).ready(function () {
	if (WEBGL.isWebGLAvailable() === false) {
		document.body.appendChild(WEBGL.getWebGLErrorMessage());
	}

	init();
	animate();
});


function init() {
	container = document.createElement('div');
	document.body.appendChild(container);
	setRenderer();
	setCamera();
	setControls();
	setScene();
	//setModel();
	createStar(50, 100, 50);
	player = new Player(0, 100, 0, undefined, undefined);
	setLight();
	window.addEventListener('resize', onWindowResize, false);
	// stats
	//stats = new Stats();
	//container.appendChild(stats.dom);
}

function animate() {
	player.movePlayer();
	for (var i in stars) {
		collide(stars[i]);
	}
	/*camera.position.x = player.object.position.x;
	camera.position.z = player.object.position.z - 400;*/
	camera.position.x = playerObj.position.x;
	camera.position.z = playerObj.position.z - 400;
	requestAnimationFrame(animate);
	if (advance != 0) {
		var delta = clock.getDelta();
		if (mixer) mixer.update(delta * advance);
	}

	renderer.render(scene, camera);
}