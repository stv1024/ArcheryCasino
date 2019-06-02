import { AABBCollider } from "../components/AABBCollider";
import { SphereCollider } from "../components/SphereCollider";

export class ColliderUpdateSystem {

    group0 = engine.getComponentGroup(AABBCollider);
    group1 = engine.getComponentGroup(SphereCollider);

    update(dt: number) {
        for (const entity of this.group0.entities) {
            const collider = entity.getComponentOrNull(AABBCollider);
            if (collider) {
                var tra = entity.getComponent(Transform);
                collider.center = tra.position;
            }
        }
        for (const entity of this.group1.entities) {
            const collider = entity.getComponentOrNull(SphereCollider);
            if (collider) {
                var tra = entity.getComponent(Transform);
                collider.center = tra.position;
            }
        }
    }
}