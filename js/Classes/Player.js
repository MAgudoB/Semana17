SceneObject.prototype = Object.create(SceneObject.prototype);
function Player(posX, posY, posZ, mesh, animations) {
    SceneObject.call(this, posX, posY, posZ, mesh);
    this.angle = 0;
    this.speed = 3;
    this.jumping = false;
    this.canJump = true;
    this.jumpSpeed = 1;
    this.jumpHeight = 50;

    this.loadModel = function () {

        loader.load('fbx/Walking.fbx', function (object) {
            playerObj = object;
            mixer = new THREE.AnimationMixer(playerObj);
            playerObj.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            playerObj.name = "Player";
            var geometry = new THREE.CubeGeometry(playerObj.position.x, playerObj.position.y, playerObj.position.z);
            var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
            playerObj.mesh = new THREE.Mesh(geometry, material);
            loader2.load('fbx/Jumping.fbx', function (object) {
                mixer2 = new THREE.AnimationMixer(object);
                object.animations[0].name = "jump";
                playerObj.animations.push(object.animations[0]);
                mixer = new THREE.AnimationMixer(playerObj);
                playerObj.walkAction = mixer.clipAction(playerObj.animations[0]);
                playerObj.jumpAction = mixer.clipAction(playerObj.animations[2]);
                scene.add(playerObj);
            });
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
        if (playerObj.mesh != undefined) playerObj.mesh.position.set(playerObj.position.x, playerObj.position.y, playerObj.position.z);
        this.jump();
    }

    this.jump = function () {
        if (this.jumping) {
            playerObj.position.y += this.jumpSpeed;
            if (playerObj.position.y > this.jumpHeight) {
                this.jumping = false;
            }
        }
        if (!this.jumping && !this.canJump) {
            playerObj.position.y -= this.jumpSpeed;
        }
        if (playerObj.position.y <= 0) {
            this.canJump = true;
            playerObj.position.y = 0;
        }
    }
}