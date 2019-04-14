var advance = 0
var rotating = 0;
var angle = 0;
var container, stats, controls;
var camera, scene, renderer;
var posx = 0;
var posy = 0;
var posz = 0;
var clock = new THREE.Clock();
var loader = new THREE.FBXLoader();
var loader2 = new THREE.FBXLoader();
var loader3 = new THREE.FBXLoader();
var objLoader = new THREE.OBJLoader();
var materialLoader = new THREE.MaterialLoader();
var light = new THREE.HemisphereLight(0xffffff, 0x444444);
var mixer;
var mixer2;
var mixer3;
var star = new THREE.Object3D();
var stars = new Array();
var player = undefined;
var playerObj = new THREE.Object3D();
var ground = new THREE.Object3D();

// Physics variables
var gravityConstant = - 9.8;
var collisionConfiguration;
var dispatcher;
var broadphase;
var solver;
var softBodySolver;
var physicsWorld;
var rigidBodies = [];
var margin = 0.05;
var transformAux1 = new Ammo.btTransform();

// Images
var grassTexture;

var collidableMeshList = [];
var jump;

var collectedStars = 0;