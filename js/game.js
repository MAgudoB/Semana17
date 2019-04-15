$(document).ready(function () {
	if (WEBGL.isWebGLAvailable() === false) {
		document.body.appendChild(WEBGL.getWebGLErrorMessage());
	}

	init();
	setTimeout(function () { animate() }, 1500);
	// animate();
});


function init() {
	container = document.createElement('div');
	document.body.appendChild(container);
	loadTextures();
	setRenderer();
	setCamera();
	setControls();
	setScene();
	//setModel();
	createStar(50, 100, -450);
	createStar(300, 100, 50);
	createStar(0, 100, 250);
	player = new Player(0, 100, 0, undefined, undefined);
	collectedStars = 0;
	setLight();
	initPhysics();
	createObjects();
	createObstacle();
	createForest();
	window.addEventListener('resize', onWindowResize, false);
	// stats
	//stats = new Stats();
	//container.appendChild(stats.dom);
}

function animate() {
	player.movePlayer();
	for (var i in stars) {
		stars[i].rotation.y += 0.1;
		var collided = collide(stars[i]);
		if (collided) {
			scene.remove(stars[i]);
			stars.splice(i, 1);
			collectedStars++;
		}
	}
	/*camera.position.x = player.object.position.x;
	camera.position.z = player.object.position.z - 400;*/
	camera.position.x = playerObj.position.x;
	camera.position.z = playerObj.position.z - 400;
	requestAnimationFrame(animate);
	var delta = clock.getDelta();
	if (player.jumping) {
		playerObj.standByAction.stop();
		playerObj.standByAction.reset();
		playerObj.jumpAction.setLoop(THREE.LoopRepeat, 1);
		playerObj.jumpAction.play();
		if (playerObj.jumpAction.time > 0.6) {
			player.jump(player.jumpSpeed);
		}
		if (mixer) { mixer.update(delta); }
	} else if (advance != 0 && !player.jumping) {
		playerObj.standByAction.stop();
		playerObj.standByAction.reset();
		playerObj.walkAction.play();
		if (mixer) { mixer.update(delta * advance); }
	} else {
		playerObj.walkAction.stop();
		playerObj.walkAction.reset();
		playerObj.standByAction.play();
		if (mixer) { mixer.update(delta); }
	}
	updatePhysics(delta);
	checkCollectedStars();
	renderer.render(scene, camera);
}