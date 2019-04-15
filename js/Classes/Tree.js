function createTree(posX, posY, posZ) {
    const geo = new THREE.Geometry();
    const level1 = new THREE.ConeGeometry(1.5, 2, 8);
    level1.faces.forEach(f => f.color.set(0x00ff00));
    level1.translate(0, 4, 0);
    geo.merge(level1);
    const level2 = new THREE.ConeGeometry(2, 2, 8);
    level2.faces.forEach(f => f.color.set(0x00ff00));
    level2.translate(0, 3, 0);
    geo.merge(level2);
    const level3 = new THREE.ConeGeometry(3, 2, 8);
    level3.faces.forEach(f => f.color.set(0x00ff00));
    level3.translate(0, 2, 0);
    geo.merge(level3);
    const trunk = new THREE.CylinderGeometry(0.5, 0.5, 2);
    trunk.faces.forEach(f => f.color.set(0xbb6600));
    trunk.translate(0, 0, 0);
    geo.merge(trunk);
    tree = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ vertexColors: THREE.VertexColors, }));
    tree.name = "Tree";
    tree.position.set(posX, posY, posZ);
    tree.scale.set(50, 50, 50);
    var shape = new Ammo.btBoxShape(new Ammo.btVector3(tree.scale.x * 0.5, tree.scale.y * 0.5, tree.scale.z * 0.5));
    shape.setMargin(margin);
    var rigidTree = createRigidBody(tree, shape, 1, tree.position, tree.quaternion);
    return rigidTree;
}