$(document).ready(function () {
	if (WEBGL.isWebGLAvailable() === false) {
		document.body.appendChild(WEBGL.getWebGLErrorMessage());
	}

	init();
	setTimeout(function () { animate() }, 1000);
	// animate();
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
	if (player.jumping) {
		// playerObj.standByAction.stop();
		playerObj.jumpAction.setLoop(THREE.LoopRepeat, 1);
		playerObj.jumpAction.play();
		if (playerObj.jumpAction.time < 0.6) {
			//Nothing to do
		} else if (playerObj.jumpAction.time < 1.1) {
			player.jump(false);
		} else {
			player.jump(true);
		}
		if (mixer) { mixer.update(delta); }
	} else if (advance != 0 && !player.jumping) {
		// playerObj.standByAction.stop();
		playerObj.walkAction.play();
		if (mixer) { mixer.update(delta * advance); }
	} else {
		playerObj.walkAction.stop();
		playerObj.walkAction.reset();
		// playerObj.standByAction.reset();
		// playerObj.standByAction.play();
	}
	renderer.render(scene, camera);
}