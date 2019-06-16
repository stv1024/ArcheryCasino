import { Target } from "../components/Target";
import { SphereCollider } from "../components/SphereCollider";
import { TargetManageSystem } from "../systems/TargetManageSystem";

export class TargetUtil {
    static killTarget(entTarget: Entity) {
        const target = entTarget.getComponentOrNull(Target);
        if (!target) return;
        target.state = 1;
        target.cd = 2;
        entTarget.removeComponent(SphereCollider);
        const arr: Array<Entity> = TargetManageSystem.aliveTargetsArray[target.id];
        const ind = arr.indexOf(entTarget);
        if (ind >= 0){
            arr.splice(ind, 1);
        }
        target.animationStates['Die'].play();
    }
}