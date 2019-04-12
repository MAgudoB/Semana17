if ( WEBGL.isWebGLAvailable() === false ) {

	document.body.appendChild( WEBGL.getWebGLErrorMessage() );

}

init();
animate();

function init() {
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	setCamera();
	setControls();
	setScene();
	setModel();
	setLight();
	setRenderer();
	createStar();
	window.addEventListener( 'resize', onWindowResize, false );
	// stats
	stats = new Stats();
	container.appendChild( stats.dom );
}

function animate() {
	angulo += girando/10;
	posz += Math.cos(angulo)*avance*3
	posx += Math.sin(angulo)*avance*3
	
	camera.position.x = posx
	camera.position.z = posz - 400
	
	personaje.position.z = posz
	personaje.position.x = posx
	personaje.rotation.y = angulo;
	requestAnimationFrame( animate );
	if(avance == 1){
		var delta = clock.getDelta();

		if ( mixer ) mixer.update( delta );
	}

	renderer.render( scene, camera );

	stats.update();

}