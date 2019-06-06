export class Vector3Extension {
    static GetElements(v3: Vector3) {
        return [v3.x, v3.y, v3.z];
    }

    static Vector3CloneTo(from: Vector3, to: Vector3) {
        to.x = from.x;
        to.y = from.y;
        to.z = from.z;
    }
}
export class MathExtension {
    static randomRange(a: number, b: number): number {
        return a + (b - a) * Math.random();
    }
}