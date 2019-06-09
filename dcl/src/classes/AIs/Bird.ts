import { BaseAI } from "./BaseAI";
import { MathExtension, Vector3Extension } from "../../utilities/MathExtension";

export class Bird extends BaseAI {

    orbitCenter: Vector3;
    orbitRadius: number;
    orbitNormal: Vector3;
    orbitOmega: number;

    local: Transform;
    t = 0;

    constructor() {
        super();
        let radius = MathExtension.randomRange(3, 7.5);
        this.orbitCenter = new Vector3(MathExtension.randomRange(radius, 16 - radius), MathExtension.randomRange(3 + radius, 27 - radius), MathExtension.randomRange(10 + radius, 30 - radius));
        this.orbitRadius = radius;
        this.orbitNormal = Vector3Extension.RandomOnUnitSphere();
        this.orbitOmega = MathExtension.randomRange(0.5, 1) * (Math.random() > 0.5 ? 1 : -1);

    }

    public update(dt: number) {
        this.t += dt;
        const o = this.orbitCenter;
        const r = this.orbitRadius;
        const w = this.orbitOmega;
        let pos = new Vector3(o.x + r * Math.cos(w * this.t), o.y, o.z + r * Math.sin(w * this.t));
        let dir = new Vector3(-Math.sin(w * this.t), 0, Math.cos(w * this.t));

        this.target.transform.position = pos;
        this.direction = dir;
    }
}