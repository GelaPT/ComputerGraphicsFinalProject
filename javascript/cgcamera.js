const CAMERA_MOVEMENT = Object.freeze({
    FORWARD: "forward",
    BACKWARD: "backward",
    LEFT: "left",
    RIGHT: "right"
});

const CAMERA_TYPE = Object.freeze({
    Perspective: "perspective",
    Ortographic: "ortographic"
});

const YAW = -90.0;
const PITCH = 0.0;
const SPEED = 7.5;
const SENSITIVITY = 0.065;
const ZOOM = 60;

class CGCamera {
    constructor(position = new CGVector3(0.0, 0.0, 0.0), worldUp = new CGVector3(0.0, 1.0, 0.0), yaw = YAW, pitch = PITCH) {

        this.position = position;
        this.worldUp = worldUp;
        this.up = worldUp;
        this.yaw = yaw;
        this.pitch = pitch;

        this.front = new CGVector3(0.0, 0.0, -1.0);
        this.right = new CGVector3(0.0, 0.0, 0.0);
        
        this.movementSpeed = SPEED;
        this.mouseSensitivity = SENSITIVITY;
        this.zoom = ZOOM;
        
        this.cameraType = CAMERA_TYPE.Perspective;
        this.threeCamera = this.GetThreeCamera();
        this.UpdateCamera();
        this.UpdateThreeCamera();
    }



    ProcessKeyboard(direction, deltaTime) {
        var velocity = this.movementSpeed * deltaTime;
        if(direction == CAMERA_MOVEMENT.FORWARD) {
            this.position = CGVector3.Subtract(this.position, CGVector3.MultiplyScalar(this.front, velocity));
        }
        if(direction == CAMERA_MOVEMENT.BACKWARD) {
            this.position = CGVector3.Add(this.position, CGVector3.MultiplyScalar(this.front, velocity));
        }
        if(direction == CAMERA_MOVEMENT.LEFT) {
            this.position = CGVector3.Add(this.position, CGVector3.MultiplyScalar(this.right, velocity));
        }
        if(direction == CAMERA_MOVEMENT.RIGHT) {
            this.position = CGVector3.Subtract(this.position, CGVector3.MultiplyScalar(this.right, velocity));
        }
        
        this.UpdateCamera();
        this.UpdateThreeCamera();
    }

    ProcessMouseScroll(yOffset) {
        this.zoom += yOffset;
        if(this.zoom < 1) {
            this.zoom = 1;
        } else if(this.zoom > ZOOM){
            this.zoom = ZOOM;
        }
        this.threeCamera = this.GetThreeCamera();
        this.UpdateThreeCamera();
    }

    ProcessMouseMovement(xOffset, yOffset) {
        xOffset *= this.mouseSensitivity;
        yOffset *= this.mouseSensitivity;

        this.yaw += xOffset;
        this.pitch += yOffset;

        if(this.pitch > 90.0) {
            this.pitch = 90.0;
        }
        if(this.pitch < -90.0) {
            this.pitch = -90.0;
        }
        if(this.yaw > 360 || this.yaw < -360) {
            this.yaw = 0;
        }

        this.UpdateCamera();
        this.UpdateThreeCamera();
    }



    GetThreeCamera() {
        if(this.cameraType == CAMERA_TYPE.Perspective) {
            return new THREE.PerspectiveCamera(this.zoom, window.innerWidth/window.innerHeight, 0.1, 1000);
        } else {
            return new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, 0.1, 1000);
        }
    }
    
    ToggleCameraType() {
        if(this.cameraType == CAMERA_TYPE.Perspective) {
            this.cameraType = CAMERA_TYPE.Ortographic;
        } else {
            this.cameraType = CAMERA_TYPE.Perspective;
        }
    }



    UpdateThreeCamera() {
        this.threeCamera.position.x = this.position.x;
        this.threeCamera.position.y = this.position.y;
        this.threeCamera.position.z = this.position.z;
        
        var lookAtVector = CGVector3.Subtract(this.position, this.front);

        this.threeCamera.lookAt(lookAtVector.x, lookAtVector.y, lookAtVector.z);
    }

    UpdateCamera() {
        var tempFront = new CGVector3(0.0, 0.0, 0.0);
        tempFront.x = Math.cos(CGMath.radians(this.yaw)) * Math.cos(CGMath.radians(this.pitch));
        tempFront.y = Math.sin(CGMath.radians(this.pitch));
        tempFront.z = Math.sin(CGMath.radians(this.yaw)) * Math.cos(CGMath.radians(this.pitch));
        this.front = CGVector3.normalize(tempFront);
        this.right = CGVector3.normalize(CGVector3.cross(this.front, this.worldUp));
        this.up = CGVector3.normalize(CGVector3.cross(this.right, this.front));
    }
}