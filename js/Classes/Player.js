SceneObject.prototype = Object.create(SceneObject.prototype);
function Player(posX, posY, posZ, mesh, animations) {
    SceneObject.call(this, posX, posY, posZ, mesh);
    this.angle = 0;
    this.speed = 3;

    this.loadModel = function () {
        loader.load('fbx/Walking.fbx', function (object) {
            mixer = new THREE.AnimationMixer(object);
            var action = mixer.clipAction(object.animations[0]);
            action.play();
            object.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            object.name = "Player";
            scene.add(object);
            this.object = object;
            playerObj = object;
        });
    }

    this.loadModel();

    this.movePlayer = function () {
        /*this.angle += rotating / 10;
        this.z += Math.cos(this.angle) * advance * this.speed;
        this.x += Math.sin(this.angle) * advance * this.speed;
        this.object.position.x = this.x;
        this.object.rotation.y = this.angle;
        this.object.position.z = this.z;*/
        this.angle += rotating / 10;
        this.z += Math.cos(this.angle) * advance * this.speed;
        this.x += Math.sin(this.angle) * advance * this.speed;
        playerObj.position.x = this.x;
        playerObj.rotation.y = this.angle;
        playerObj.position.z = this.z;
    }
}