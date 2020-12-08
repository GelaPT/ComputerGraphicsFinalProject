// Tells the HTML document that he should run Start function upon completing the load
document.addEventListener('DOMContentLoaded', Start);

var scene = new THREE.Scene();
var camera = new CGCamera(new CGVector3(0, 0, 6), new CGVector3(0, 1, 0), 0.0, 0.0);
var renderer = new THREE.WebGLRenderer();

var cube, cubeGeometry, cubeMaterial;

var deltaTime = 0, lastTime = 0;

function Start() {
    camera = new CGCamera(new CGVector3(0, 0, 6), new CGVector3(0, 1, 0), 90.0, 0.0);
    renderer.setSize(window.innerWidth - 15, window.innerHeight - 15);

    document.body.appendChild(renderer.domElement);
    renderer.domElement.onclick = function() {
        renderer.domElement.requestPointerLock();
    }

    cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    cubeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe:true});

    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    scene.add(cube);

    MainLoop();
}

function MainLoop() {
    var currentTime = performance.now();
    deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    renderer.render(scene, camera.threeCamera);

    requestAnimationFrame(MainLoop);
}

document.addEventListener('keydown', ev=>{
    if(ev.key == "ArrowUp" || ev.key == "w") {
        camera.ProcessKeyboard(CAMERA_MOVEMENT.FORWARD, deltaTime);
    }
    if(ev.key == "ArrowDown" || ev.key == "s") {
        camera.ProcessKeyboard(CAMERA_MOVEMENT.BACKWARD, deltaTime);
    }
    if(ev.key == "ArrowRight" || ev.key == "d") {
        camera.ProcessKeyboard(CAMERA_MOVEMENT.RIGHT, deltaTime);
    }
    if(ev.key == "ArrowLeft" || ev.key == "a") {
        camera.ProcessKeyboard(CAMERA_MOVEMENT.LEFT, deltaTime);
    }
    if(ev.key == "c") {
        camera.ToggleCameraType();
        camera.threeCamera = camera.GetThreeCamera();
    }
})

document.addEventListener('wheel', ev=>{
    camera.ProcessMouseScroll(ev.deltaY/3);
})

document.addEventListener('mousemove', ev=>{
    if(renderer != null) {
        if(document.pointerLockElement === renderer.domElement) {
            camera.ProcessMouseMovement(ev.movementX, ev.movementY);
        }
    }
})

window.onresize = function() {
    if(renderer != null) {
        renderer.setSize(window.innerWidth - 15, window.innerHeight - 15);
    }
}