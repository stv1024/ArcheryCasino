import { FollowCameraComp } from "../components/FollowCameraComp";
import { Global } from "../Constants";

export class FollowCameraSystem {
    group = engine.getComponentGroup(FollowCameraComp)

    update(dt: number) {
        var camPos = Camera.instance.position.add(Global.CameraOffset);
        var camRot = Camera.instance.rotation;
        log('update', camPos)
        for (let entity of this.group.entities) {
            const transform = entity.getComponent(Transform)
            const follow = entity.getComponent(FollowCameraComp);
            transform.position = Vector3.Lerp(transform.position, camPos, 1 - follow.damp);
            transform.rotation = Quaternion.Slerp(transform.rotation, camRot, 1 - follow.damp);
        }
    }
}
