import { Arrow } from "./Arrow";
import { g, Global, arrowLocalPos } from "./Constants";

export class ArrowUpdateSystem {

    group = engine.getComponentGroup(Arrow)

    update(dt: number) {
        for (let entity of this.group.entities) {
            const arrow = entity.getComponent(Arrow)
            var tra = entity.getComponent(Transform);
            if (arrow.state == 0) {
                var cam = Camera.instance;
                tra.position = cam.position.clone().add(new Vector3(0, 1.6, 0)).add(arrowLocalPos.clone().rotate(cam.rotation));
                tra.rotation = cam.rotation.clone();
            } else if (arrow.state == 1) {//flying
                tra.position = tra.position.add(arrow.velocity.scale(dt));
                arrow.velocity = arrow.velocity.add(new Vector3(0, -g, 0).scale(dt));
                tra.rotation = Quaternion.FromToRotation(Vector3.Forward(), arrow.velocity.clone());
                
            }
        }
    }
}