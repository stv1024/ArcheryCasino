import { Global } from "../Constants";
import { MainUI } from "../classes/MainUILayout";

export class CheckValidZoneSystem {
    update(dt: number) {
        if (Global.insideValidZone) {
            if (Camera.instance.position.z > 6) {
                Global.insideValidZone = false;
                MainUI.imgBan.visible = true;
            }
        } else {
            if (Camera.instance.position.z <= 6) {
                Global.insideValidZone = true;
                MainUI.imgBan.visible = false;
            }
        }
    }
}