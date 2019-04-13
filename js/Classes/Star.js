function Star(posX, posY, posZ) {
    var pts = [], numPts = 5;

    for (var i = 0; i < numPts * 2; i++) {

        var l = i % 2 == 1 ? 10 : 20;

        var a = i / numPts * Math.PI;

        pts.push(new THREE.Vector2(Math.cos(a) * l, Math.sin(a) * l));

    }

    var shape = new THREE.Shape(pts);

    var closedSpline = new THREE.CatmullRomCurve3([
        new THREE.Vector3(- 60, - 100, 60),
        new THREE.Vector3(- 60, 20, 60),
        new THREE.Vector3(- 60, 120, 60),
        new THREE.Vector3(60, 20, - 60),
        new THREE.Vector3(60, - 100, - 60)
    ]);

    closedSpline.curveType = 'catmullrom';
    closedSpline.closed = true;

    var material = new THREE.MeshLambertMaterial({ color: 0xb00000, wireframe: false });
    var material2 = new THREE.MeshLambertMaterial({ color: 0xff8000, wireframe: false });
    var materials = [material, material2];

    var extrudeSettings = {
        depth: 20,
        steps: 1,
        bevelEnabled: true,
        bevelThickness: 2,
        bevelSize: 4,
        bevelSegments: 1
    };

    var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);

    var mesh = new THREE.Mesh(geometry, materials);

    mesh.position.set(posX, posY, posZ);

    return mesh;
}