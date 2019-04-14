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
	var delta = clock.getDelta();
	if (advance != 0 && player.canJump && !player.jumpAction.isRunning()) {
		playerObj.walkAction.play();
		playerObj.jumpAction.stop();
		if (mixer) mixer.update(delta * advance);
	}
	if (!player.canJump) {
		if (!playerObj.jumpAction.isRunning()) {
			playerObj.jumpAction.play();
			playerObj.walkAction.stop();
			playerObj.walkAction.reset();
		}
		if (mixer) mixer.update(delta);
	}
	renderer.render(scene, camera);
}