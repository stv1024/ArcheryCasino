import { Global } from "../Constants";

export class TransformUtil {

    /**
     * Transform a point from outside Transform to inside.
     * @param tra 
     * @param point 
     */
    static InverseTransformPoint(tra: Transform, point: Vector3) {
        var v1 = point.subtract(tra.position);
        return v1.rotate(Quaternion.Inverse(tra.rotation));
    }

    static GetCameraPositionInRoot(): Vector3 {
        var rootTra = Global.root.getComponent(Transform);
        return TransformUtil.InverseTransformPoint(rootTra, Camera.instance.position);
    }
    static GetCameraRotationInRoot(): Quaternion {
        var rootTra = Global.root.getComponent(Transform);
        return Quaternion.Inverse(rootTra.rotation).multiply(Camera.instance.rotation);
    }
}