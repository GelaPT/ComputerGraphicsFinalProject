// Tells the HTML document that he should run Start function upon completing the load
document.addEventListener('DOMContentLoaded', Start);

var scene, camera, renderer;

var cube, cubeGeometry, cubeMaterial;

var deltaTime = 0, lastTime = 0;

function Start() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(65, window.innerWidth/window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth - 15, window.innerHeight - 15);

    document.body.appendChild(renderer.domElement);

    cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    cubeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe:true});

    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    scene.add(cube);

    camera.position.z = 6;

    MainLoop();
}

function MainLoop() {
    var currentTime = performance.now();
    deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    
    cube.rotation.x += 1 * deltaTime;
    //cube.position.x = Math.cos(deltaTime);

    renderer.render(scene, camera);

    requestAnimationFrame(MainLoop);
}