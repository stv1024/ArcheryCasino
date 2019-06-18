import { Arrow } from "../components/Arrow";
import { Physics } from "../classes/Physics";
import { Ray } from "../classes/Ray";
import { RaycastHit } from "../classes/RaycastHit";
import { Target } from "../components/Target";
import { TargetUtil } from "../utilities/TargetUtil";
import { Global } from "../Constants";

export class ArrowUpdateSystem {

    group = engine.getComponentGroup(Arrow)

    private spring = 0.5;

    update(dt: number) {
        for (let entity of this.group.entities) {
            const arrow = entity.getComponent(Arrow)
            var tra = entity.getComponent(Transform);
            if (arrow.state == 0) {
                /*
                var cam = Camera.instance;
                var tarPos = cam.position.clone().add(Global.CameraOffset).add(Global.arrowLocalPos.clone().rotate(cam.rotation));
                tra.position = Vector3.Lerp(tra.position, tarPos, this.spring);
                var tarRot = cam.rotation.clone();
                tra.rotation = Quaternion.Slerp(tra.rotation, tarRot, this.spring);
                */
            } else if (arrow.state == 1) {//flying
                let lastPos = tra.position.clone();
                tra.position = tra.position.add(arrow.velocity.scale(dt));
                if (tra.position.y >= -0.05) {
                    arrow.velocity = arrow.velocity.add(new Vector3(0, -Global.arrowGravity, 0).scale(dt));
                    tra.rotation = Quaternion.FromToRotation(Vector3.Forward(), arrow.velocity.clone());
                    let hitInfo = new RaycastHit();
                    let hit = Physics.raycast(new Ray(lastPos, tra.position.subtract(lastPos)), hitInfo, tra.position.subtract(lastPos).length());
                    if (hit) {
                        //log('Arrow hit', hit, hitInfo.collider, hitInfo.distance, hitInfo.point);
                        arrow.state = 2;
                        arrow.cd = 1;
                        const ent = hitInfo.collider.entity;
                        const target = ent.getComponentOrNull(Target);
                        if (target) {
                            TargetUtil.killTarget(ent);
                        }
                        if (Global.curRound) {
                            Global.curRound.onArrowEndFlying(arrow);
                        }
                    }
                } else {
                    //remove out-of-range arrows
                    arrow.state = 2;
                    arrow.cd = 1;
                    if (Global.curRound) {
                        Global.curRound.onArrowEndFlying(arrow);
                    }
                }
            } else if (arrow.state == 2) {
                arrow.cd -= dt;
                if (arrow.cd <= 0) {
                    arrow.state = 3;
                    engine.removeEntity(entity);
                }
            }
        }
    }
}