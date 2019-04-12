var avance = 0
var girando = 0;
var angulo = 0;
var container, stats, controls;
var camera, scene, renderer;
var personaje = new THREE.Object3D();
var posx = 0;
var posy = 0;
var posz = 0;
var clock = new THREE.Clock();
var loader = new THREE.FBXLoader();
var light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
var mixer;