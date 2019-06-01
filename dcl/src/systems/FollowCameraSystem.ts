import { FollowCameraComp } from "../components/FollowCameraComp";

export class FollowCameraSystem {
    group = engine.getComponentGroup(FollowCameraComp)

    update(dt: number) {
        var camPos = Camera.instance.position;
        var camRot = Camera.instance.rotation;
        for (let entity of this.group.entities) {
            const transform = entity.getComponent(Transform)
            transform.position = camPos;
            transform.rotation = camRot;
        }
    }
}
