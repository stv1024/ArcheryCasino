import { Target } from "../../components/Target";

export abstract class BaseAI {
    public target: Target;
    direction: Vector3 = Vector3.Forward();
    array = ['x', 'y', 'z'];
    public update(dt: number) { };

    /**
     * return true if hit boundary
     */
    checkBoundaryAndTurn(): boolean {
        const info = this.target.info;
        const tra = this.target.transform;
        const pos = tra.position;
        let result = false;
        this.array.forEach(c => {
            if (pos[c] <= info.min[c]) {
                this.direction[c] = Math.abs(this.direction[c]);
                result = true;
            } else if (pos[c] >= info.max[c]) {
                this.direction[c] = -Math.abs(this.direction[c]);
                result = true;
            }
        });
        return result;
    }
}