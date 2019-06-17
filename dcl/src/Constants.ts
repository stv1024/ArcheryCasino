import { Round } from "./utilities/Rules";

export const g = 9.8;
export const arrowGravity = 9.8/3;
export const arrowLocalPos = new Vector3(0.1, -0.02, 0.8);
export const Global = {
    money: 1000,
    root: null as Entity,
    CameraOffset: new Vector3(0, 1.6, 0),
    curRound: null as Round,
};