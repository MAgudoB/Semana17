SceneObject.prototype = Object.create(SceneObject.prototype);
function Player(posX, posY, posZ, mesh, animations) {
    SceneObject.call(this, posX, posY, posZ, mesh);
    this.angle = 0;
    this.speed = 3;

    this.movePlayer = function () {
        this.angle += rotating / 10;
        this.mesh.position.x = Math.sin(this.angle) * advance * this.speed;
        this.mesh.position.y = this.angle;
        this.mesh.position.z = Math.cos(this.angle) * advance * this.speed;
    }
}