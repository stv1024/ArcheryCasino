import { BaseAI } from "../classes/AIs/BaseAI";
import { TargetInfoTable } from "../classes/TargetInfoTable";

@Component("Target")
export class Target {
    /**
     * 0-alive 1-die 2-destroy
     */
    public state: number;
    public id: string;
    public transform: Transform;
    public info: any;

    public ai: BaseAI;

    public animationStates = {};

    public cd: number;
    
    constructor(id: string, transform: Transform) {
        this.state = 0;
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