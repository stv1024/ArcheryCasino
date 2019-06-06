import { Physics } from "../classes/Physics";
import { Ray } from "../classes/Ray";
import { RaycastHit } from "../classes/RaycastHit";
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
            log('key', id);
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
            let info = target.info;
            
        }
    }


    createTargetEntity(id: string): Entity {
        let info = TargetInfoTable[id];
        log('createTargetEntity', id, info)
        if (!info) return null;
        let entity = new Entity(info.name);
        engine.addEntity(entity);
        this.aliveTargetsArray[id].push(entity);
        let pos = new Vector3(
            MathExtension.randomRange(info.min.x, info.max.x),
            MathExtension.randomRange(info.min.y, info.max.y),
            MathExtension.randomRange(info.min.z, info.max.z));
        let rot = Quaternion.Euler(0, MathExtension.randomRange(0, 360), 0);
        let tra = entity.addComponent(new Transform({ position: pos, rotation: rot }));
        {
            let art = new Entity(info.name + '_art');
            art.addComponent(new Transform({ position: new Vector3(0, info.radius * 0.5), scale: new Vector3().setAll(info.radius) }));
            art.setParent(entity);
            let shape = art.addComponent(new SphereShape());
            shape.withCollisions = true;
        }
        entity.addComponent(new Target());
        entity.addComponent(new SphereCollider(info.radius)).center = new Vector3(0, info.radius * 0.5);
    }
}