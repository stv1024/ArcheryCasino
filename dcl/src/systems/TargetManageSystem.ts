import { Global } from "../Constants";
import { Target } from "../components/Target";
import { TargetInfoTable } from "../classes/TargetInfoTable";
import { MathExtension } from "../utilities/MathExtension";
import { SphereCollider } from "../components/SphereCollider";
import { AnimationUtil } from "../utilities/AnimationUtil";

export class TargetManageSystem {
    group = engine.getComponentGroup(Target);

    static aliveTargetsArray = {}; //{[Entity]}

    constructor() {
        for (const id in TargetInfoTable) {
            if (TargetInfoTable.hasOwnProperty(id)) {
                TargetManageSystem.aliveTargetsArray[id] = [];
            }
        }
    }

    update(dt: number) {
        //Spawn
        for (const id in TargetInfoTable) {
            if (TargetInfoTable.hasOwnProperty(id)) {
                const info = TargetInfoTable[id];
                if (TargetManageSystem.aliveTargetsArray[id].length < info.maxCount) {
                    let targetEntity = this.createTargetEntity(id);
                }
            }
        }

        //Move
        for (let entity of this.group.entities) {
            let tra = entity.getComponent(Transform);
            let target = entity.getComponent(Target);
            if (target.state == 0) {
                let ai = target.ai;
                if (ai) {
                    ai.update(dt);
                    const curRot = Quaternion.FromToRotation(Vector3.Forward(), ai.direction);
                    if (tra.rotation.eulerAngles.subtract(curRot.eulerAngles).lengthSquared() > 1e-2) {
                        tra.rotation = curRot;
                    }
                }
            } else if (target.state == 1) {
                target.cd -= dt;
                if (target.cd <= 0) {
                    target.state = 2;
                    engine.removeEntity(entity);
                }
            }
        }
    }


    createTargetEntity(id: string): Entity {
        let info = TargetInfoTable[id];
        //log('createTargetEntity', id, info)
        if (!info) return null;
        let entity = new Entity(info.name);
        entity.setParent(Global.root);
        TargetManageSystem.aliveTargetsArray[id].push(entity);
        let pos = new Vector3(
            MathExtension.randomRange(info.min.x, info.max.x),
            MathExtension.randomRange(info.min.y, info.max.y),
            MathExtension.randomRange(info.min.z, info.max.z));
        let rot = Quaternion.Euler(0, MathExtension.randomRange(0, 360), 0);
        let tra = entity.addComponent(new Transform({ position: pos, rotation: rot }));
        const target = entity.addComponent(new Target(id, tra));
        {
            let model = info.model;
            if (model) {
                let art = new Entity(info.name + '_art');
                let tra = art.addComponent(new Transform({ position: new Vector3(0, 0, 0).add(info.offset), scale: new Vector3().setAll(info.scale) }));
                art.setParent(entity);
                const shape = art.addComponent(model); //FIXME：最后一只猪死后，新刷出来的猪有一定概率加载不出模型

                let animator = new Animator();
                art.addComponent(animator);
                info.animClips.forEach((animClipName: string) => {
                    const clip = new AnimationState(animClipName);
                    animator.addClip(clip);
                    target.animationStates[animClipName] = clip;
                });
                target.animationStates['Idle'].looping = true;
                target.animationStates['Walk'].looping = id != '1';
                target.animationStates['Spawn'].looping = false;
                target.animationStates['Die'].looping = false;

                AnimationUtil.playAnimationOn(target.animationStates, 'Spawn');
            }
            if (false) {
                let block = new Entity(info.name + '_block');
                block.addComponent(new Transform({ position: new Vector3(0, info.radius * 0.5, 0), scale: new Vector3().setAll(info.radius) }));
                block.setParent(entity);
                const gizmo = block.addComponent(new SphereShape());
                gizmo.withCollisions = true;
                gizmo.visible = true;
            }
        }
        entity.addComponent(new SphereCollider(entity, info.radius)).center = new Vector3(0, info.radius * 0.5, 0);
    }
}