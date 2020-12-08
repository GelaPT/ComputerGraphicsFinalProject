var CGMath = {
    radians: function(degree) {
        return degree/180 * Math.PI;
    }
}

class CGVector2 {
    static zero = new CGVector2(0, 0);
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static normalize(vec) {
        var lengthOfVector = Math.sqrt((vec.x * vec.x) + (vec.y * vec.y));
        return new CGVector2(vec.x / lengthOfVector, vec.y / lengthOfVector);
    }
}

class CGVector3 {
    static zero = new CGVector3(0, 0, 0);

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static normalize(vec) {
        var lengthOfVector = Math.sqrt((vec.x * vec.x) + (vec.y * vec.y) + (vec.z * vec.z));
        return new CGVector3( vec.x / lengthOfVector,
                            vec.y / lengthOfVector,
                            vec.z / lengthOfVector);
    }

    static cross(vecA, vecB) {
        return new CGVector3((vecA.y * vecB.z) - (vecA.z * vecB.y),
                            (vecA.z * vecB.x) - (vecA.x * vecB.z),
                            (vecA.x * vecB.y) - (vecA.y * vecB.x));
    }

    static Subtract(vecA, vecB) {
        return new CGVector3((vecA.x - vecB.x), (vecA.y - vecB.y), (vecA.z - vecB.z));
    }

    static Add(vecA, vecB) {
        return new CGVector3(vecA.x + vecB.x, vecA.y + vecB.y, vecA.z + vecB.z);
    }

    static Multiply(vecA, vecB) {
        return new CGVector3(vecA.x * vecB.x, vecA.y * vecB.y, vecA.z * vecB.z);
    }

    static MultiplyScalar(vecA, num) {
        return new CGVector3(vecA.x * num, vecA.y * num, vecA.z * num);
    }
}