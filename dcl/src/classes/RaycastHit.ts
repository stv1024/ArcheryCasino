
export class RaycastHit {
    collider: any;
    distance: float;
    //normal: Vector3;
    point: Vector3;

    cloneTo(hitInfo: RaycastHit) {
        hitInfo.collider = this.collider;
        hitInfo.distance = this.distance;
        hitInfo.point = this.point;
    }
}