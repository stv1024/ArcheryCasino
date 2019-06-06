export const TargetInfoTable: any = {};

TargetInfoTable[1] = {
    name: "Rabbit",
    min: new Vector3(1, 0, 5),
    max: new Vector3(15, 0, 26),
    output: 1,
    radius: 0.3,
    speed: 0.4,
    maxCount: 5,
    //special
    jumpSpeed: 1
};
TargetInfoTable[2] = {
    name: "Pig",
    min: new Vector3(1, 0, 8),
    max: new Vector3(15, 0, 31),
    output: 2,
    radius: 0.7,
    speed: 0.6,
    maxCount: 5,
    //special
    jumpSpeed: 1
};
TargetInfoTable[3] = {
    name: "Bird",
    min: new Vector3(1, 1, 12),
    max: new Vector3(15, 24, 31),
    output: 3,
    radius: 0.1,
    speed: 1,
    maxCount: 5,
    //special
    jumpSpeed: 1
};