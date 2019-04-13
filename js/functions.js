$(document).keypress(function (event) {
	// Esto es lo que pasa cuando pulso la W
	if (event.which == 119) { advance = 1; }
	// Esto es lo que pasa cuando pulso la S
	if (event.which == 115) { advance = -1; }
	// Esto es lo que pasa cuando pulso la A
	if (event.which == 97) { rotating = 1; }
	// Esto es lo que pasa cuando pulso la D
	if (event.which == 100) { rotating = -1; }
});
$(document).keyup(function (event) {
	// Esto es lo que pasa cuando pulso la W
	if (event.which == 87) { advance = 0; }
	// Esto es lo que pasa cuando pulso la S
	if (event.which == 83) { advance = 0; }
	// Esto es lo que pasa cuando pulso la A
	if (event.which == 65) { rotating = 0; }
	// Esto es lo que pasa cuando pulso la D
	if (event.which == 68) { rotating = 0; }
});

function setCamera() {
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
	camera.position.set(0, 200, -300);
}

function setControls() {
	controls = new THREE.OrbitControls(camera);
	controls.target.set(0, 100, 0);
	controls.autoRotate = false;
	controls.enableKeys = false;
	controls.enablePan = false;
	controls.enableZoom = false;
	controls.screenSpacePanning = false;
	controls.update();
}

function setScene() {
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xa0a0a0);
	scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);

	// ground
	var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2000, 2000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
	mesh.rotation.x = - Math.PI / 2;
	mesh.receiveShadow = true;
	scene.add(mesh);

	var grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
	grid.material.opacity = 0.2;
	grid.material.transparent = true;
	scene.add(grid);
}

function setRenderer() {
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	container.appendChild(renderer.domElement);
}

function setModel() {
	loader.load('fbx/Walking.fbx', function (object) {
		mixer = new THREE.AnimationMixer(object);
		var action = mixer.clipAction(object.animations[0]);
		action.play();
		player = object;
		object.traverse(function (child) {
			if (child.isMesh) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		});
		scene.add(object);
	});
}

function setLight() {
	light.position.set(posx, posy + 200, posz);
	scene.add(light);
	light = new THREE.DirectionalLight(0xffffff);
	light.position.set(0, 200, 100);
	light.castShadow = true;
	light.shadow.camera.top = 180;
	light.shadow.camera.bottom = - 100;
	light.shadow.camera.left = - 120;
	light.shadow.camera.right = 120;
	player.add(light);
}

/*function createStar() {
	new THREE.MTLLoader()
		.setPath('fbx/star/')
		.load('star.mtl', function (materials) {
			materials.preload();
			new THREE.OBJLoader()
				.setMaterials(materials)
				.setPath('fbx/star/')
				.load('star.obj', function (object) {
					object.scale.set(20, 20, 20);
					object.position.y = 100;
					scene.add(object);
					star = object;
				});
		});
}*/

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

}