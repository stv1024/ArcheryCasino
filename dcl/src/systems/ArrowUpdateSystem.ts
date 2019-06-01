import { Arrow } from "../components/Arrow";
import { g, Global, arrowLocalPos } from "../Constants";
import { Physics } from "../classes/Physics";
import { Ray } from "../classes/Ray";
import { RaycastHit } from "../classes/RaycastHit";

export class ArrowUpdateSystem {

    group = engine.getComponentGroup(Arrow)

    private spring = 0.5;

    update(dt: number) {
        for (let entity of this.group.entities) {
            const arrow = entity.getComponent(Arrow)
            var tra = entity.getComponent(Transform);
            if (arrow.state == 0) {
                var cam = Camera.instance;
                var tarPos = cam.position.clone().add(new Vector3(0, 1.6, 0)).add(arrowLocalPos.clone().rotate(cam.rotation));
                tra.position = Vector3.Lerp(tra.position, tarPos, this.spring);
                var tarRot = cam.rotation.clone();
                tra.rotation = Quaternion.Slerp(tra.rotation, tarRot, this.spring);
            } else if (arrow.state == 1) {//flying
                let lastPos = tra.position.clone();
                tra.position = tra.position.add(arrow.velocity.scale(dt));
                if (tra.position.y >= -1) {
                    arrow.velocity = arrow.velocity.add(new Vector3(0, -g, 0).scale(dt));
                    tra.rotation = Quaternion.FromToRotation(Vector3.Forward(), arrow.velocity.clone());
                    let hitInfo = new RaycastHit();
                    let hit = Physics.raycast(new Ray(lastPos, tra.position.subtract(lastPos)), hitInfo, tra.position.subtract(lastPos).length());
                    if (hit) {
                        log(hit, hitInfo.collider, hitInfo.distance, hitInfo.point);
                        arrow.state = 2;
                    }
                } else {
                    //remove out range arrows
                    engine.removeEntity(entity);
                }
            }
        }
    }
}