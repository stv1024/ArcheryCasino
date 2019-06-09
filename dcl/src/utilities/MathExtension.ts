export class Vector3Extension {
    static GetElements(v3: Vector3) {
        return [v3.x, v3.y, v3.z];
    }

    static Vector3CloneTo(from: Vector3, to: Vector3) {
        to.x = from.x;
        to.y = from.y;
        to.z = from.z;
    }

    private static halfOneV3 = new Vector3(0.5, 0.5, 0.5);
    static RandomInsideUnitSphere(): Vector3 {
        //TODO: better algorithm
        while (true) {
            let v3 = new Vector3(Math.random(), Math.random(), Math.random());
            v3.subtractInPlace(this.halfOneV3);
            if (v3.lengthSquared() > 0.25) continue;
            return v3.scale(2);
        }
    }
    static RandomOnUnitSphere() {
        return this.RandomInsideUnitSphere().normalize();
    }
}
export class MathExtension {
    static randomRange(a: number, b: number): number {
        return a + (b - a) * Math.random();
    }
}