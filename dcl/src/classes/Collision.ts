import { Ray } from "./Ray";
import { Vector3Extension } from "../utilities/MathExtension";

export class Box {
    min: Vector3;
    max: Vector3;
}

export class Collision {

    static _tempV30: Vector3;
    static _tempV31: Vector3;

    static intersectsRayAndBoxRD(ray: Ray, box: Box): float {
        var rayoe = Vector3Extension.GetElements(ray.origin);
        var rayoeX = rayoe[0];
        var rayoeY = rayoe[1];
        var rayoeZ = rayoe[2];
        var rayde = Vector3Extension.GetElements(ray.direction);
        var raydeX = rayde[0];
        var raydeY = rayde[1];
        var raydeZ = rayde[2];
        var boxMine = Vector3Extension.GetElements(box.min);
        var boxMineX = boxMine[0];
        var boxMineY = boxMine[1];
        var boxMineZ = boxMine[2];
        var boxMaxe = Vector3Extension.GetElements(box.max);
        var boxMaxeX = boxMaxe[0];
        var boxMaxeY = boxMaxe[1];
        var boxMaxeZ = boxMaxe[2];
        var out = 0;
        var tmax = Number.MAX_VALUE;
        if (MathUtils3D.isZero(raydeX)) {
            if (rayoeX < boxMineX || rayoeX > boxMaxeX) {
                return -1;
            }
        } else {
            var inverse = 1 / raydeX;
            var t1 = (boxMineX - rayoeX) * inverse;
            var t2 = (boxMaxeX - rayoeX) * inverse;
            if (t1 > t2) {
                var temp = t1;
                t1 = t2;
                t2 = temp;
            }
            out = Math.max(t1, out);
            tmax = Math.min(t2, tmax);
            if (out > tmax) {
                return -1;
            }
        }
        if (MathUtils3D.isZero(raydeY)) {
            if (rayoeY < boxMineY || rayoeY > boxMaxeY) {
                return -1;
            }
        } else {
            var inverse1 = 1 / raydeY;
            var t3 = (boxMineY - rayoeY) * inverse1;
            var t4 = (boxMaxeY - rayoeY) * inverse1;
            if (t3 > t4) {
                var temp1 = t3;
                t3 = t4;
                t4 = temp1;
            }
            out = Math.max(t3, out);
            tmax = Math.min(t4, tmax);
            if (out > tmax) {
                return -1;
            }
        }
        if (MathUtils3D.isZero(raydeZ)) {
            if (rayoeZ < boxMineZ || rayoeZ > boxMaxeZ) {
                return -1;
            }
        } else {
            var inverse2 = 1 / raydeZ;
            var t5 = (boxMineZ - rayoeZ) * inverse2;
            var t6 = (boxMaxeZ - rayoeZ) * inverse2;
            if (t5 > t6) {
                var temp2 = t5;
                t5 = t6;
                t6 = temp2;
            }
            out = Math.max(t5, out);
            tmax = Math.min(t6, tmax);
            if (out > tmax) {
                return -1;
            }
        }
        return out;
    }

    /**
     * return distance from the origin
     * @param ray 
     * @param box 
     * @param out hitPoint
     */
    static intersectsRayAndBoxRP(ray: Ray, box: Box, out: Vector3): float {
        var distance = Collision.intersectsRayAndBoxRD(ray, box);
        if (distance === -1) {
            out = Vector3.Zero();
            return distance;
        }
        Collision._tempV30 = ray.direction.scale(distance);
        Collision._tempV31 = ray.origin.add(Collision._tempV30);
        Vector3Extension.Vector3CloneTo(Collision._tempV31, out);
        return distance;
    }

    static intersectsRayAndSphereRD(ray: Ray, sphere: { radius: float, center: Vector3 }) {
        var sphereR = sphere.radius;
        Collision._tempV30 = ray.origin.subtract(sphere.center);
        var b = Vector3.Dot(Collision._tempV30, ray.direction);
        var c = Vector3.Dot(Collision._tempV30, Collision._tempV30) - (sphereR * sphereR);
        if (c > 0 && b > 0) {
            return -1;
        };
        var discriminant = b * b - c;
        if (discriminant < 0) {
            return -1;
        };
        var distance = -b - Math.sqrt(discriminant);
        if (distance < 0)
            distance = 0;
        return distance;
    }

    static intersectsRayAndSphereRP(ray: Ray, sphere: { radius: float, center: Vector3 }, out) {
        var distance = Collision.intersectsRayAndSphereRD(ray, sphere);
        if (distance === -1) {
            out = Vector3.Zero();
            return distance;
        }
        Collision._tempV30 = ray.direction.scale(distance);
        Collision._tempV31 = Vector3.Add(ray.origin, Collision._tempV30);
        Vector3Extension.Vector3CloneTo(Collision._tempV31, out);
        return distance;
    }
}