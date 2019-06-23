import { Round } from "./utilities/Rules";

export const g = 9.8;
export const Global = {
    money: 1000,
    costPerRound: 10,
    arrowsPerRound: 10,
    root: null as Entity,
    bow: null as Entity,
    startButtonHint: null as Entity,
    validZoneHint: null as Entity,
    arrowGravity: 9.8 / 3,
    CameraOffset: new Vector3(0, 1.7 + 0.72, 0),
    arrowLocalPos: new Vector3(0, -0.334, 0.8),
    curRound: null as Round,
    insideValidZone: false,
    
    asBowShoot: null as AudioSource,
    asPigIdle: null as AudioSource,
    asBirdIdle: null as AudioSource,
    asEarn: null as AudioSource,
    asHit: null as AudioSource,
    asStart: null as AudioSource,
    asDrawBow: null as AudioSource,
};