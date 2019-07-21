import { Global } from "../Constants";
import { MainUI } from "../classes/MainUILayout";
import { TransformUtil } from "../utilities/TransformUtil";

export class CheckValidZoneSystem {
    update(dt: number) {
        var rootTra = Global.root.getComponent(Transform);
        var camPos = TransformUtil.InverseTransformPoint(rootTra, Camera.instance.position);
        if (Global.insideValidZone) {
            if (camPos.z > 6) {
                Global.insideValidZone = false;
                MainUI.imgBan.visible = true;
            }
        } else {
            if (camPos.z <= 6) {
                Global.insideValidZone = true;
                MainUI.imgBan.visible = false;
            }
        }
    }
}