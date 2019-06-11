import { Global } from "../Constants";
import { Target } from "../components/Target";
import { TargetInfoTable } from "../classes/TargetInfoTable";
import { MathExtension } from "../utilities/MathExtension";
import { SphereCollider } from "../components/SphereCollider";

export class TargetManageSystem {
    group = engine.getComponentGroup(Target);

    aliveTargetsArray = {};

    constructor() {
        for (const id in TargetInfoTable) {
            if (TargetInfoTable.hasOwnProperty(id)) {
                this.aliveTargetsArray[id] = [];
            }
        }
    }

    update(dt: number) {
        //Spawn
        for (const id in TargetInfoTable) {
            if (TargetInfoTable.hasOwnProperty(id)) {
                const info = TargetInfoTable[id];
                if (this.aliveTargetsArray[id].length < info.maxCount) {
                    let targetEntity = this.createTargetEntity(id);
                }
            }
        }

        //Move
        for (let entity of this.group.entities) {
            let tra = entity.getComponent(Transform);
            let target = entity.getComponent(Target);
            let ai = target.ai;
            if (ai) {
                ai.update(dt);
                tra.rotation = Quaternion.FromToRotation(Vector3.Forward(), ai.direction);
            }
        }
    }


    createTargetEntity(id: string): Entity {
        let info = TargetInfoTable[id];
        log('createTargetEntity', id, info)
        if (!info) return null;
        let entity = new Entity(info.name);
        entity.setParent(Global.root);
        this.aliveTargetsArray[id].push(entity);
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
                let tra = art.addComponent(new Transform({ position: new Vector3(0, info.radius * 0.5, 0).add(info.offset), scale: new Vector3().setAll(info.scale) }));
                art.setParent(entity);
                const shape = art.addComponent(model);

                let animator = new Animator();
                art.addComponent(animator);
                info.animClips.forEach((animClipName: string) => {
                    const clip = new AnimationState(animClipName);
                    animator.addClip(clip);
                    target.animationStates[animClipName] = clip;
                });
                const walk : AnimationState = target.animationStates['Walk'];
                walk.looping = true;
                walk.play();
            }
            if (true) {
                let block = new Entity(info.name + '_block');
                block.addComponent(new Transform({ position: new Vector3(0, info.radius * 0.5, 0), scale: new Vector3().setAll(info.radius) }));
                block.setParent(entity);
                const gizmo = block.addComponent(new SphereShape());
                gizmo.withCollisions = true;
                gizmo.visible = false;
            }
        }
        entity.addComponent(new SphereCollider(info.radius)).center = new Vector3(0, info.radius * 0.5, 0);
    }
}