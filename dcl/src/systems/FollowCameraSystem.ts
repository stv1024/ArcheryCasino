import { FollowCameraComp } from "../components/FollowCameraComp";
import { Global } from "../Constants";
import { TransformUtil } from "../utilities/TransformUtil";

export class FollowCameraSystem {
    group = engine.getComponentGroup(FollowCameraComp)

    update(dt: number) {
        var rootTra = Global.root.getComponent(Transform);
        var camPos = TransformUtil.InverseTransformPoint(rootTra, Camera.instance.position);
        var camRot = Quaternion.Inverse(rootTra.rotation).multiply(Camera.instance.rotation);
        for (let entity of this.group.entities) {
            const transform = entity.getComponent(Transform)
            const follow = entity.getComponent(FollowCameraComp);
            if (transform.position.subtract(camPos).lengthSquared() > 1e-6) {
                transform.position = Vector3.Lerp(transform.position, camPos, 1 - follow.damp);
            }
            if (transform.rotation.eulerAngles.subtract(camRot.eulerAngles).lengthSquared() > 1e-3) {
                transform.rotation = Quaternion.Slerp(transform.rotation, camRot, 1 - follow.damp);
            }
        }
    }
}
