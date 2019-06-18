import { Target } from "../components/Target";
import { SphereCollider } from "../components/SphereCollider";
import { TargetManageSystem } from "../systems/TargetManageSystem";
import { Global } from "../Constants";
import { Rules } from "./Rules";
import { AnimationUtil } from "./AnimationUtil";

export class TargetUtil {
    static killTarget(entTarget: Entity) {
        const target = entTarget.getComponentOrNull(Target);
        if (!target) return;
        target.state = 1;
        target.cd = 2;
        entTarget.removeComponent(SphereCollider);
        const arr: Array<Entity> = TargetManageSystem.aliveTargetsArray[target.id];
        const ind = arr.indexOf(entTarget);
        if (ind >= 0) {
            arr.splice(ind, 1);
        }
        AnimationUtil.playAnimationOn(target.animationStates, 'Die');
        if (Global.curRound) {
            Global.curRound.bag[target.id] += 1;

            //Target Reward
            Global.money += Rules.targetRewards[target.id];

            //TODO: Quest Reward
            Global.curRound.quests.forEach(quest => {
                if (quest.finished) return;
                let finished = true;
                for (let id in quest.list) {
                    if (!Global.curRound.bag[id] || Global.curRound.bag[id] < quest.list[id]) {
                        finished = false;
                        break;
                    }
                }
                if (finished) {
                    quest.finished = true;
                    Global.money += quest.reward;
                }
            });

            //TODO:刷新UI
            log('money', Global.money);
        }
    }
}