import { BaseAI } from "./BaseAI";
import { MathExtension } from "../../utilities/MathExtension";
import { g } from "../../Constants";
import { AnimationUtil } from "../../utilities/AnimationUtil";

export class Rabbit extends BaseAI {
    /**
     * 0:Idle 1:Moving
     */
    state: number = 0;

    vY: number = 0;
    y: number = 0;

    countdown: number = 6;


    public update(dt: number) {
        this.countdown -= dt;
        if (this.countdown <= 0) {
            if (this.state == 0) {
                this.direction = new Vector3(MathExtension.randomRange(-1, 1), 0, MathExtension.randomRange(-1, 1)).normalize();
                this.state = 1;
                this.countdown += MathExtension.randomRange(0.25, 0.5);
            } else if (this.state == 1) {
                this.state = 0;
                this.countdown += MathExtension.randomRange(6, 12);
            }
        }
        if (this.y >= 0) {
            this.y += this.vY * dt;
            this.vY += -g * 2 * dt;
            if (this.y <= 0) {
                this.y = 0;
                this.vY = 0;
            }
        }
        if (this.state == 0) {
            //Keep Idle
            AnimationUtil.playAnimationOn(this.target.animationStates, 'Idle');
        } else if (this.state == 1) {
            const info = this.target.info;
            if (this.y <= 0) {
                //Jump
                this.vY = info.jumpSpeed;
                AnimationUtil.playAnimationOn(this.target.animationStates, 'Walk');
            }
        }
        if (this.state == 1 || this.y > 0) {
            const speed = this.target.info.speed;
            const tra = this.target.transform;
            let pos = tra.position.clone();
            pos.addInPlace(this.direction.scale(speed * dt));
            pos.y = this.y;
            tra.position = pos;
            this.checkBoundaryAndTurn();
        }
    }
}