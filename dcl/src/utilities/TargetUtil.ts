import { Target } from "../components/Target";
import { SphereCollider } from "../components/SphereCollider";
import { TargetManageSystem } from "../systems/TargetManageSystem";
import { Global } from "../Constants";
import { Rules } from "./Rules";
import { AnimationUtil } from "./AnimationUtil";
import { MainUI } from "../classes/MainUILayout";

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
            const newEarnMoney = Rules.targetRewards[target.id];
            Global.curRound.earnedMoney += newEarnMoney;
            Global.money += newEarnMoney;

            //Quest Reward
            Global.curRound.quests.forEach(quest => {
                if (quest.finished) return;
                let finished = true;
                for (let id in quest.list) {
                    if (Global.curRound.bag[id] < quest.list[id]) {
                        finished = false;
                        break;
                    }
                }
                if (finished) {
                    quest.finished = true;
                    const newEarnMoney = quest.reward;
                    Global.curRound.earnedMoney += newEarnMoney;
                    Global.money += newEarnMoney;
                }
            });

            //刷新UI
            MainUI.refreshAll();
        }
    }
}