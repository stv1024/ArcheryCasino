import { AimingUI } from "../components/AimingUI";
import { Physics } from "../classes/Physics";
import { Ray } from "../classes/Ray";
import { RaycastHit } from "../classes/RaycastHit";
import { Global } from "../Constants";

export class AimingSystem {
    group = engine.getComponentGroup(AimingUI)
    update(dt: number) {
        var camPos = Camera.instance.position.add(Global.CameraOffset);
        var camRot = Camera.instance.rotation;
        var aimingDir = Vector3.Forward().rotate(camRot);
        var ray = new Ray(camPos, aimingDir);
        var hitInfo = new RaycastHit();
        var hit = Physics.raycast(ray, hitInfo);
        if (hit) {
        }
        for (let entity of this.group.entities) {
            let panel = entity.getComponent(Transform);
            panel.scale = hit ? Vector3.One() : Vector3.Zero();
        }
    }
}