@Component("FollowCameraComp")
export class FollowCameraComp {
    damp: float = 0;

    constructor(damp: float = 0) {
        this.damp = Math.max(0, Math.min(1, damp));
    }
}