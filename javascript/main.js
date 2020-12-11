// Tells the HTML document that he should run Start function upon completing the load
document.addEventListener('DOMContentLoaded', Start);

var scene = new THREE.Scene();
var camera = new CGCamera(new CGVector3(0, 0, 6), new CGVector3(0, 1, 0), -90, 30.0);
var renderer = new THREE.WebGLRenderer();

var importedObject, animationMixer;
var clock = new THREE.Clock();
var importer = new THREE.FBXLoader();

var checkMateText = new THREE.TextGeometry("CHECK MATE!", );

importer.load('../models/Chess.fbx', function(object) {
    animationMixer = new THREE.AnimationMixer(object);

    animationMixer.addEventListener('finished', function(ev) {
        new THREE.TextGeometry();
    });

    var action = animationMixer.clipAction(object.animations[0]);
    action.play();
    action.clampWhenFinished = true;
    action.loop = THREE.LoopOnce;
    action.timeScale = 0.6;

    object.traverse(function (child) {
        if(child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    scene.add(object);

    object.scale.x = 0.01;
    object.scale.y = 0.01;
    object.scale.z = 0.01;

    object.position.y = -1;

    importedObject = object;
})

var deltaTime = 0, lastTime = 0;

function Start() {
    camera = new CGCamera(new CGVector3(20, 15, 0), new CGVector3(0, 1, 0), 0.0, 30.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    renderer.domElement.onclick = function() {
        renderer.domElement.requestPointerLock();
    }

    var light = [
        new THREE.PointLight('#ffffff', 1),
        new THREE.PointLight('#ffffff', 1),
        new THREE.PointLight('#ffffff', 1),
        new THREE.PointLight('#ffffff', 1),
        new THREE.PointLight('#ffffff', 1)
    ];

    light[0].position.z = 20;
    light[0].position.x = 20;

    light[1].position.z = -20;
    light[1].position.x = 20;
    
    light[2].position.z = -20;
    light[2].position.x = -20;
    
    light[3].position.z = 20;
    light[3].position.x = -20;

    for(var i = 0; i < 5; i++) {
        light[i].position.y = 5;
        
        light[i].lookAt(0, -1, 0);

        scene.add(light[i]);
    }

    MainLoop();
}

function MainLoop() {
    var currentTime = performance.now();
    deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    renderer.render(scene, camera.threeCamera);

    if(animationMixer) {
        animationMixer.update(clock.getDelta())
    }

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
        camera.UpdateThreeCamera();
    }
    if(ev.key == "r") {
        animationMixer.clipAction(importedObject.animations[0]).reset();
    }
    if(ev.key == " ") {
        if(animationMixer.timeScale == 0) {
            animationMixer.timeScale = 0.6;   
        } else {
            animationMixer.timeScale = 0;
        }
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