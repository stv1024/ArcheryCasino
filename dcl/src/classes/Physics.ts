import { Ray } from "../classes/Ray";
import { RaycastHit } from "../classes/RaycastHit";
import { AABBCollider } from "../components/AABBCollider";
import { SphereCollider } from "../components/SphereCollider";

export class Physics {

    static colliderTypes = [AABBCollider, SphereCollider];
    static groups = [engine.getComponentGroup(AABBCollider), engine.getComponentGroup(SphereCollider)];

    static raycast(ray: Ray, hitInfo: RaycastHit, maxDistance: float): boolean {
        //FIXME:应该按距离排序，但这个版本不管了
        for (let i = 0; i < this.groups.length; i++) {
            // const colliderType = this.colliderTypes[i];
            const group = this.groups[i];

            for (let entity of group.entities) {
                // const collider = entity.getComponent(colliderType);

                // let hit = collider.raycast(ray, hitInfo, maxDistance);
                // if (hit) return true;
                
                if (entity.getComponentOrNull(AABBCollider)) {
                    let cldr = entity.getComponent(AABBCollider);
                    let hit = cldr.raycast(ray, hitInfo, maxDistance);
                    if (hit) return true;
                }
                else if (entity.getComponentOrNull(SphereCollider)) {
                    let cldr = entity.getComponent(SphereCollider);
                    let hit = cldr.raycast(ray, hitInfo, maxDistance);
                    if (hit) return true;
                }
                return false;
            }
        }
    }
}