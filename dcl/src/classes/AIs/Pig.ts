import { BaseAI } from "./BaseAI";
import { MathExtension } from "../../utilities/MathExtension";
import { AnimationUtil } from "../../utilities/AnimationUtil";
import { Global } from "../../Constants";

export class Pig extends BaseAI {

    state: number = 0; //0:Idle 1:Run

    countdown: number = 0;


    public update(dt: number) {
        this.countdown -= dt;
        if (this.countdown <= 0) {
            if (this.state == 0) {
                this.direction = new Vector3(MathExtension.randomRange(-1, 1), 0, MathExtension.randomRange(-1, 1)).normalize();
                this.state = 1;
                AnimationUtil.playAnimationOn(this.target.animationStates, 'Walk');
                this.countdown += MathExtension.randomRange(6, 10);
            } else if (this.state == 1) {
                this.state = 0;
                AnimationUtil.playAnimationOn(this.target.animationStates, 'Idle');
                this.countdown += MathExtension.randomRange(4, 8);

                if (Math.random() <= 1) {
                    Global.asPigIdle.playOnce();
                }
            }
        }
        if (this.state == 0) {
            //Keep Idle
        } else if (this.state == 1) {
            //Run
            const speed = this.target.info.speed;
            const tra = this.target.transform;
            tra.position.addInPlace(this.direction.scale(speed * dt));
            this.checkBoundaryAndTurn();
        }
    }
}