import { Ray } from "../classes/Ray";
import { RaycastHit } from "../classes/RaycastHit";
import { Collision, Box } from "../classes/Collision";

@Component("AABBCollider")
export class AABBCollider {
    entity: Entity;
    center: Vector3;
    size: Vector3 = Vector3.One();
    offset: Vector3 = Vector3.Zero();

    /**
     * 
     * @param size 
     */
    constructor(entity: Entity, size: Vector3 = Vector3.One()) {
        this.entity = entity;
        this.size = size;
    }

    raycast(ray: Ray, hitInfo: RaycastHit, maxDistance: float = Number.MAX_VALUE): boolean {
        var box = new Box();
        box.max = this.center.add((this.size.scale(0.5).add(this.offset)));
        var hitPoint = new Vector3();
        var distance = Collision.intersectsRayAndBoxRP(ray, box, hitPoint);
        if (distance >= 0 && distance <= maxDistance) {
            if (hitInfo) {
                hitInfo.collider = this;
                hitInfo.distance = distance;
                hitInfo.point = hitPoint;
            }
            return true;
        }
        return false;
    }
}