import { Ray } from "../classes/Ray";
import { RaycastHit } from "../classes/RaycastHit";
import { Collision } from "../classes/Collision";

@Component("SphereCollider")
export class SphereCollider {
    entity: Entity;
    center: Vector3;
    radius: float = 0.1;

    /**
     *
     */
    constructor(entity: Entity, radius: float = 0.1) {
        this.entity = entity;
        this.radius = radius;
    }

    raycast(ray: Ray, hitInfo: RaycastHit, maxDistance: float = Number.MAX_VALUE): boolean {
        var sphere = { center: this.center, radius: this.radius };
        var hitPoint = new Vector3();
        var distance = Collision.intersectsRayAndSphereRP(ray, sphere, hitPoint);
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