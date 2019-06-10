import { BaseAI } from "../classes/AIs/BaseAI";
import { TargetInfoTable } from "../classes/TargetInfoTable";

@Component("Target")
export class Target {
    public id: string;
    public transform: Transform;
    public info: any;

    public ai: BaseAI;

    public animationStates = {};
    /**
     *
     */
    constructor(id: string, transform: Transform) {
        this.id = id;
        this.transform = transform;
        this.info = TargetInfoTable[id];
        let aiClass = this.info.ai;
        if (aiClass) {
            this.ai = new aiClass();
            this.ai.target = this;
        }
    }
}