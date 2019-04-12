if (WEBGL.isWebGLAvailable() === false) {

	document.body.appendChild(WEBGL.getWebGLErrorMessage());

}

$(document).ready(function () {
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
	setModel();
	setLight();
	window.addEventListener('resize', onWindowResize, false);
	// stats
	//stats = new Stats();
	//container.appendChild(stats.dom);
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {
	angle += rotating / 10;
	posz += Math.cos(angle) * advance * 3
	posx += Math.sin(angle) * advance * 3

	camera.position.x = posx
	camera.position.z = posz - 400

	player.position.z = posz
	player.position.x = posx
	player.rotation.y = angle;
	requestAnimationFrame(animate);
	if (advance == 1) {
		var delta = clock.getDelta();

		if (mixer) mixer.update(delta);
	}

	//controls.update();
	renderer.render(scene, camera);
	//stats.update();

}