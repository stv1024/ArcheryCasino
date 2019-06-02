export class Ray {
    origin: Vector3;
    direction: Vector3;
    constructor(origin: Vector3, direction: Vector3) {
        this.origin = origin;
        this.direction = direction.normalizeToNew();
    }

    getPoint(length: float){
        return this.origin.add(this.direction.scale(length));
    }
}