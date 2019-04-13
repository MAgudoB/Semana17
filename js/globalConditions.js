var advance = 0
var rotating = 0;
var angle = 0;
var container, stats, controls;
var camera, scene, renderer;
var player = new THREE.Object3D();
var posx = 0;
var posy = 0;
var posz = 0;
var clock = new THREE.Clock();
var loader = new THREE.FBXLoader();
var objLoader = new THREE.OBJLoader();
var materialLoader = new THREE.MaterialLoader();
var light = new THREE.HemisphereLight(0xffffff, 0x444444);
var mixer;
var star = new THREE.Object3D();
var stars = new Array();
