import { BaseAI } from "./BaseAI";
import { MathExtension } from "../../utilities/MathExtension";
import { g } from "../../Constants";

export class Rabbit extends BaseAI {

    state: number = 0; //0:Idle 1:Moving

    vY: number = 0;
    y: number = 0;

    countdown: number = 0;


    public update(dt: number) {
        this.countdown -= dt;
        if (this.countdown <= 0) {
            if (this.state == 0) {
                this.direction = new Vector3(MathExtension.randomRange(-1, 1), 0, MathExtension.randomRange(-1, 1)).normalize();
                this.state = 1;
                this.countdown += MathExtension.randomRange(6, 10);
            } else if (this.state == 1) {
                this.state = 0;
                this.countdown += MathExtension.randomRange(4, 8);
            }
        }
        if (this.y >= 0) {
            this.y += this.vY * dt;
            this.vY += -g * dt;
            if (this.y <= 0) {
                this.y = 0;
                this.vY = 0;
            }
        }
        if (this.state == 0) {
            //Keep Idle
        } else if (this.state == 1) {
            const info = this.target.info;
            if (this.y <= 0) {
                //Jump
                this.vY = info.jumpSpeed;
            }
        }
        if (this.state == 1 || this.y > 0) {
            const speed = this.target.info.speed;
            const tra = this.target.transform;
            let pos = tra.position;
            pos.addInPlace(this.direction.scale(speed * dt));
            pos.y = this.y;
            tra.position = pos;
            this.checkBoundaryAndTurn();
        }
    }
}