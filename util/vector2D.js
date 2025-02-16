export class Vector2D {
    constructor(x = 0, y = x) {
        this.x = x;
        this.y = y;
    }

    //Addition
    add(u = this) {
        this.x += u.x;
        this.y += u.y;
        return this;
    }

    addScaled(u = this, s = 1) {
        this.x += s * u.x;
        this.y += s * u.y;
        return this;
    }

    addScalar(s = 0) {
        this.x += s;
        this.y += s;
        return this;
    }

    //Subtraction
    sub(u = this) {
        this.x -= u.x;
        this.y -= u.y;
        return this;
    }

    subScalar(s = 0) {
        this.x += s;
        this.y += s;
        return this;
    }

    //Products
    multiply(s = 0) {
        this.x *= s;
        this.y *= s;
        return this;
    }

    divide(s = 1) {
        this.x /= s;
        this.y /= s;
        return this;
    }

     /**
     * Calculates the hadamard product of this vector and v
     * @param  {[Vector2D]} u 2D Vector
     */
    hadamard(u = this) {
        this.x *= u.x;
        this.y *= u.y;
        return this;
    }

    dot(u = this) {
        return this.x * u.x + this.y * u.y;
    }

     /**
     * Calculates the magnitude of the 3D cross product (vx,vy,0)x(ux,uy,0)
     * @param  {[Vector2D]} u 2-Dimensional Vector
     * @return {[Number]}   Magnitude of the Vector in 3D
     */
    cross(u = this) {
        return this.x * u.y - this.y * u.x;
    }

     /**
     * Calculates the 3D cross product (ux,uy,0)x(0,0,-1)
     * @param  {[Vector2D]} u 2-Dimensional Vector
     */
    crossZ(u = this) {
        this.x = -u.y;
        this.y = u.x;
        return this;
    }

    //Vector Stuff
    get magnitude() {
        return Math.hypot(this.x, this.y);
    }

    get magnitude2() {
        return this.x * this.x + this.y * this.y;
    }

    normalize() {
        if(this.x == 0 && this.y == 0) return this;
        this.divide(this.magnitude);
        return this;
    }

    negate() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    rotate(theta = 0) {
        let x = this.x, y = this.y;
        this.x = x * Math.cos(theta) - y * Math.sin(theta);
        this.y = x * Math.sin(theta) + y * Math.cos(theta);
        return this;
    }

    rotateAt(theta = 0, u = this) {
        let x = this.x - u.x, y = this.y - u.y;
        this.x = u.x + x * Math.cos(theta) - y * Math.sin(theta);
        this.y = u.y + x * Math.sin(theta) + y * Math.cos(theta);
        return this;
    }

    mirrorX() {
        this.x = -this.x;
        return this;
    }

    mirrorY() {
        this.y = -this.y;
        return this;
    }

    distance(u = this) {
        return Math.hypot(this.x - u.x, this.y - u.y)
    }

    //Useful Stuff
    get copy() {
        return new Vector2D(this.x, this.y);
    }

    static get down() {
        return new Vector2D(0, 1);
    }

    static get up() {
        return new Vector2D(0, -1);
    }

    static get left() {
        return new Vector2D(-1, 1);
    }

    static get right() {
        return new Vector2D(1, 1);
    }
}